# Future Server Features

**Source:** [Hytale Server Manual](https://support.hytale.com/hc/en-us/articles/45326769420827-Hytale-Server-Manual)  
**Last Modified:** Friday, January 16, 2026 at 12:56 PM

---

## Overview

Upcoming Hytale server features will enhance discoverability, social gameplay, monetization, and operations for server administrators.

---

## Server & Minigame Discovery

**Status:** Planned for main menu integration.

**Features:**
- In-game server browser for servers and minigames
- Server operators opt-in to promote content
- Real-time player discovery catalogue

**Listing Requirements:**

| Requirement | Description |
|-------------|-------------|
| Server Operator Guidelines | Must follow Hytale community standards |
| Self-Rating | Accurate content ratings for parental controls |
| Enforcement | Violations lead to delisting |

**Player Count Verification:**
- Uses client telemetry (not server-reported)
- Prevents count spoofing
- Unverified counts shown for manually added servers

---

## Parties System

**Status:** In development.

**Features:**
- Cross-server party persistence
- Party-aware server browsing
- Visible party size limits before joining

**Integration:**
- Groups browse/join servers together
- Seamless social experience across Hytale ecosystem

---

## Integrated Payment System

**Status:** Planned client integration.

**Server Operator Benefits:**
- Accept payments without external services
- No payment infrastructure required
- Secure transactions via Hytale

**Player Benefits:**
- In-game payments (no external websites)
- Fully secure and traceable
- Ecosystem-contained transactions

---

## SRV Record Support

**Status:** Unsupported, under evaluation.

**What it enables:**
- Connect via `play.example.com` (no port needed)
- DNS resolves address + port automatically

**Current Limitations:**
- No production-ready C# SRV library
- Full DNS client adds complexity/risk
- Revisit when suitable solution available

---

## First-Party API Endpoints

**Status:** Planned for authenticated servers.

**Core Endpoints:**

| Endpoint | Description |
|----------|-------------|
| UUID ↔ Name Lookup | Single/bulk player name resolution |
| Game Version | Protocol/version checking |
| Player Profile | Cosmetics, avatar, public data |
| Server Telemetry | Status reporting for discovery |
| Report | ToS violation reporting |
| Payments | Built-in payment processing |

**Under Consideration:**

| Endpoint | Description |
|----------|-------------|
| Global Sanctions | Platform-level ban checks |
| Friends List | Social features (permissioned) |
| Webhook Subscriptions | Event notifications |

**Design Goals:**
- Generous rate limits + bulk endpoints
- Server authentication required
- Versioned APIs with deprecation windows

---

## Getting Help

**Official Channels:**
- **Server Manual:** [Hytale Server Manual](https://support.hytale.com/hc/en-us/articles/45326769420827-Hytale-Server-Manual)
- **Discord:** [Official Hytale Discord](https://discord.gg/hytale)
- **Blog:** [Hytale News](https://hytale.com/news)
