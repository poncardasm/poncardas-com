---
title: How to Update Homebrew and Formulae
description: Steps to Update Homebrew and Installed Formulae
date: 2024-12-15
tags: ["tutorial", "macos"]
image: 60809.png
---

<img src="./60809.png" alt="How to Update Homebrew and Formulae">

1. **Update Homebrew itself:** First, make sure your Homebrew is up-to-date with the latest repository information:

```bash
brew update
```

2. **Upgrade all installed formulae:** To upgrade all your installed formulae to their latest versions:

```bash
brew upgrade
```

This will check for updates and apply them to any installed formulae or casks.

3. **Upgrade specific formula:** If you only want to upgrade a particular program, specify its name:

```bash
brew upgrade <formula_name>
```

## Checking for Available Updates

If you only want to see what updates are available without upgrading, you can use:

```bash
brew outdated
```

This will list all formulae and casks that have a newer version available.

## Cleaning Up Old Versions

After upgrading, old versions of formulae may remain on your system. To remove them and free up disk space:

```bash
brew cleanup
```

## Example Workflow

Check what can be updated:

```bash
brew outdated
```

Update specific formulae or all outdated ones:

```bash
brew upgrade
```

Clean up after upgrading:

```bash
brew cleanup
```
