const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://britakee-studios.gitbook.io/hytale-modding-documentation';
// Adjusted paths because SUMMARY.md is in Documentation/ subdirectory
// and script is in scripts/ subdirectory
const SUMMARY_PATH = path.join(__dirname, '..', 'Documentation', 'SUMMARY.md');
const OUTPUT_PATH = path.join(__dirname, '..', 'Documentation', 'llms.txt');

/**
 * Slugify a string for GitBook URL construction
 */
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+&\s+/g, '-and-') // Replace & with 'and'
        .replace(/\s+/g, '-')         // Replace spaces with -
        .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
        .replace(/\-\-+/g, '-')       // Replace multiple - with single -
        .replace(/^-+/, '')           // Trim - from start
        .replace(/-+$/, '');          // Trim - from end
}

/**
 * Parse SUMMARY.md to extract documentation structure
 */
function parseSummary() {
    if (!fs.existsSync(SUMMARY_PATH)) {
        console.error('❌ SUMMARY.md not found at:', SUMMARY_PATH);
        process.exit(1);
    }

    const content = fs.readFileSync(SUMMARY_PATH, 'utf-8');
    const lines = content.split('\n');

    const sections = [];
    let currentSection = null;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        // Match section headers (lines starting with ##)
        const sectionMatch = trimmed.match(/^##\s+(.+)/);
        if (sectionMatch) {
            if (currentSection) {
                sections.push(currentSection);
            }
            currentSection = {
                title: sectionMatch[1],
                items: []
            };
            return;
        }

        // Match list items with links: * [Title](path)
        const itemMatch = trimmed.match(/^\*\s+\[(.+?)\]\((.+?)\)/);
        if (itemMatch) {
            const [, title, linkPath] = itemMatch;

            let url = linkPath;
            if (!linkPath.startsWith('http')) {
                // Remove leading slash if present
                const cleanPath = linkPath.startsWith('/') ? linkPath.substring(1) : linkPath;
                // Remove .md extension
                const pathNoExt = cleanPath.replace(/\.md$/, '');

                // Construct URL with section slug if available
                let sectionSlug = '';
                if (currentSection && currentSection.title && currentSection.title !== 'Introduction') {
                    // We skip Introduction prefix for now unless user asked, but consistency suggests we might need it.
                    // Actually, usually Introduction -> root or introduction/.
                    // Let's stick to standard GitBook: Sections are folders.
                    // But usually README.md in Introduction is the root.
                    // Let's try to maintain the path structure IF the Section Title implies a folder different from root.
                    // But wait, the file "10-useful-tools.md" is in root Documentation/, but URL is /resources-and-tools/...
                    // So the folder is purely virtual.

                    sectionSlug = slugify(currentSection.title);
                    // If slug is 'introduction', typically that might be skipped for README?
                    // Let's assume non-empty slug gets prepended.
                } else if (currentSection && currentSection.title === 'Introduction') {
                    // For introduction, we might verify. often it is just root.
                    // But if there are other files in Introduction, they might need 'introduction/'.
                    // Let's assume standard behavior: Introduction IS a section.
                    sectionSlug = slugify(currentSection.title);
                }

                // However, we need to handle README.md specifically?
                if (cleanPath === 'README.md' || pathNoExt === 'README') {
                    url = `${BASE_URL}`; // Root
                } else {
                    if (sectionSlug) {
                        url = `${BASE_URL}/${sectionSlug}/${pathNoExt}`;
                    } else {
                        url = `${BASE_URL}/${pathNoExt}`;
                    }
                }
            }

            if (currentSection) {
                currentSection.items.push({ title, url });
            } else {
                // Items before any section (e.g. Overview)
                if (!sections.length && !currentSection) {
                    currentSection = { title: "Overview", items: [] };
                    currentSection.items.push({ title, url });
                } else {
                    currentSection.items.push({ title, url });
                }
            }
        }
    });

    if (currentSection) {
        sections.push(currentSection);
    }

    return sections;
}

/**
 * Generate llms.txt content
 */
function generateLlmsTxt(sections) {
    let output = `# Hytale Modding Documentation

Hytale Modding Documentation — Complete guide for content creators and developers 🎮

## Table of Contents

`;

    // Add main overview links if not already present or as a header
    output += `- [Overview](${BASE_URL})\n`;

    sections.forEach(section => {
        if (section.title !== "Overview") { // Avoid modifying the overview section if we created one ad-hoc
            output += `\n## ${section.title}\n\n`;
        } else {
            output += `\n`;
        }

        section.items.forEach(item => {
            output += `- [${item.title}](${item.url})\n`;
        });
    });

    return output;
}

/**
 * Main function
 */
function main() {
    console.log('🚀 Generating llms.txt...\n');

    try {
        // Parse SUMMARY.md
        console.log(`📖 Parsing SUMMARY.md from ${SUMMARY_PATH}...`);
        const sections = parseSummary();
        console.log(`✅ Found ${sections.length} sections\n`);

        // Generate llms.txt content
        console.log('✍️  Generating llms.txt content...');
        const content = generateLlmsTxt(sections);

        // Write to file
        fs.writeFileSync(OUTPUT_PATH, content, 'utf-8');
        console.log(`✅ llms.txt generated successfully at: ${OUTPUT_PATH}\n`);

        // Show preview
        console.log('📄 Preview (first 500 characters):');
        console.log('─'.repeat(50));
        console.log(content.substring(0, 500) + '...\n');
        console.log('─'.repeat(50));
        console.log(`\n✨ Total size: ${content.length} characters`);

    } catch (error) {
        console.error('❌ Error generating llms.txt:', error.message);
        process.exit(1);
    }
}

// Run the script
main();
