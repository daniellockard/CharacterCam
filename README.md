# Character Cam

A Foundry VTT module that automatically follows a selected character's movement with the camera.

## Features

- **Automatic Camera Following**: The camera automatically follows a selected character as they move around the scene
- **Configurable Target**: Choose which character the camera should follow from a dropdown list
- **Smooth Movement**: Optional smooth camera transitions instead of instant snapping
- **Distance Control**: Adjustable follow distance from the character
- **Smart Handling**: Automatically stops following if the target character is deleted or removed from the scene

## Installation

1. Download this module folder
2. Place it in your Foundry VTT `modules` directory
3. Enable the module in your world's module settings
4. Configure the module settings as needed

## Configuration

The module provides several configuration options accessible through the module settings:

### Enable Camera Following
Toggle to enable/disable the camera following functionality.

### Target Character
Select which character the camera should follow from a dropdown list of all characters in your world.

### Smooth Camera Movement
When enabled, the camera will smoothly transition to follow the character instead of instantly snapping to their position.

### Follow Distance
Set the distance (in grid units) that the camera should maintain from the character. A value of 0 means the camera will center directly on the character.

## Usage

1. **Enable the Module**: Go to Module Settings and enable "Character Cam"
2. **Select a Target**: Choose which character you want the camera to follow
3. **Start Following**: Enable the "Enable Camera Following" setting
4. **Move Your Character**: The camera will automatically follow the selected character as they move

## Technical Details

This module uses Foundry VTT's public API to:
- Monitor token position changes
- Update camera position smoothly
- Handle scene changes and token deletions
- Provide user-friendly notifications

The module is designed to be compatible with Foundry VTT version 13 and uses only public API methods to ensure stability across updates.

## Compatibility

- **Foundry VTT**: Version 13+
- **Game Systems**: Compatible with all game systems
- **Other Modules**: Should work alongside other modules without conflicts

## License

MIT License - feel free to modify and distribute as needed.

## Support

If you encounter any issues or have feature requests, please create an issue on the module's repository.

## Changelog

### Version 1.0.0
- Initial release
- Basic camera following functionality
- Configuration options for target character and movement style
- Smooth and instant camera movement options
- Automatic handling of token/actor deletions 