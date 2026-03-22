# Sound Alerts Hook Pack

Plays sound effects to notify you when Claude Code needs your input or finishes a task. No more staring at the terminal waiting -- go do something else and let the sounds tell you when to come back.

## What It Does

- **Awaiting input**: Plays a gentle notification sound when Claude is waiting for your response.
- **Task done**: Plays a completion sound when Claude finishes a turn.

Uses macOS system sounds by default. Linux alternatives are included below.

## Installation

Add the following hooks to your project's `.claude/settings.json` (or your user-level `~/.claude/settings.json` to apply globally):

```json
{
  "hooks": [
    {
      "event": "Notification",
      "command": "afplay /System/Library/Sounds/Blow.aiff &"
    },
    {
      "event": "Stop",
      "command": "afplay /System/Library/Sounds/Glass.aiff &"
    }
  ]
}
```

If you already have a `hooks` array, merge these entries into it.

## Linux Alternative

Replace `afplay` with `paplay` (PulseAudio) or `aplay` (ALSA), and use your own sound files:

```json
{
  "hooks": [
    {
      "event": "Notification",
      "command": "paplay /usr/share/sounds/freedesktop/stereo/message-new-instant.oga &"
    },
    {
      "event": "Stop",
      "command": "paplay /usr/share/sounds/freedesktop/stereo/complete.oga &"
    }
  ]
}
```

## Customization

### Use different macOS system sounds

Available sounds are in `/System/Library/Sounds/`. Common options:

| Sound | File |
|-------|------|
| Blow | `/System/Library/Sounds/Blow.aiff` |
| Glass | `/System/Library/Sounds/Glass.aiff` |
| Ping | `/System/Library/Sounds/Ping.aiff` |
| Pop | `/System/Library/Sounds/Pop.aiff` |
| Purr | `/System/Library/Sounds/Purr.aiff` |
| Submarine | `/System/Library/Sounds/Submarine.aiff` |
| Tink | `/System/Library/Sounds/Tink.aiff` |

### Use text-to-speech instead

```json
{
  "hooks": [
    {
      "event": "Notification",
      "command": "say 'Claude needs your input' &"
    },
    {
      "event": "Stop",
      "command": "say 'Task complete' &"
    }
  ]
}
```

### Adjust volume (macOS)

`afplay` supports a `--volume` flag (0 to 255):

```bash
afplay --volume 128 /System/Library/Sounds/Glass.aiff &
```
