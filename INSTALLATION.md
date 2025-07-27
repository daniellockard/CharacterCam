# Installation Guide

## Quick Installation

1. **Download the Module**
   - Download this entire folder
   - Ensure all files are included (module.json, scripts/, lang/, etc.)

2. **Install in Foundry VTT**
   - Navigate to your Foundry VTT installation directory
   - Go to the `modules` folder
   - Copy the entire `character-cam` folder into the `modules` directory

3. **Enable the Module**
   - Start Foundry VTT
   - Go to your world
   - Navigate to **Game Settings** → **Manage Modules**
   - Find "Character Cam" in the list
   - Check the box to enable it
   - Click **Save Changes**

4. **Configure the Module**
   - Go to **Game Settings** → **Configure Settings**
   - Find the "Character Cam" section
   - Configure your desired settings:
     - **Enable Camera Following**: Turn this on to start following
     - **Target Character**: Select which character to follow
     - **Smooth Camera Movement**: Enable for smooth transitions
     - **Follow Distance**: Set how far from the character to maintain

## File Structure

Your module folder should look like this:
```
character-cam/
├── module.json
├── scripts/
│   └── character-cam.js
├── lang/
│   └── en.json
├── test/
│   └── test-character-cam.js
├── README.md
├── INSTALLATION.md
└── LICENSE
```

## Troubleshooting

### Module Not Appearing
- Ensure all files are in the correct location
- Check that `module.json` is properly formatted
- Restart Foundry VTT after installation

### Camera Not Following
- Verify the target character has a token in the current scene
- Check that the module is enabled in module settings
- Ensure "Enable Camera Following" is turned on in the module configuration

### Performance Issues
- Try disabling "Smooth Camera Movement" for better performance
- Reduce the camera update frequency if needed
- Ensure your Foundry VTT version is 13 or higher

## Testing

To test the module:
1. Load a scene with character tokens
2. Enable the module and select a target character
3. Move the selected character's token
4. The camera should follow the movement

You can also run the test script in the browser console:
```javascript
// Copy and paste this into the browser console
fetch('/modules/character-cam/test/test-character-cam.js')
  .then(response => response.text())
  .then(code => eval(code));
```

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all files are present and properly formatted
3. Test with a fresh world to rule out conflicts
4. Check the Foundry VTT Discord for community support 