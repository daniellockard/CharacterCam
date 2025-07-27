/**
 * Test script for Character Cam module
 * Run this in the browser console to test the module
 */

// Test function to verify module is loaded
function testCharacterCamModule() {
  console.log('Testing Character Cam Module...');
  
  // Check if module is loaded
  if (typeof CharacterCam === 'undefined') {
    console.error('❌ CharacterCam class not found');
    return false;
  }
  
  console.log('✅ CharacterCam class found');
  
  // Check if instance exists
  if (!CharacterCam.instance) {
    console.error('❌ CharacterCam instance not found');
    return false;
  }
  
  console.log('✅ CharacterCam instance found');
  
  // Check if settings are registered
  const enabledSetting = game.settings.get('character-cam', 'enabled');
  console.log('✅ Settings registered, enabled:', enabledSetting);
  
  // Test actor choices function
  const choices = CharacterCam.getActorChoices();
  console.log('✅ Actor choices function works:', Object.keys(choices).length, 'choices available');
  
  console.log('✅ All tests passed!');
  return true;
}

// Test function to simulate token movement
function testTokenMovement() {
  console.log('Testing token movement simulation...');
  
  // Get first character token
  const tokens = canvas.scene.tokens.filter(token => token.actor?.type === 'character');
  if (tokens.length === 0) {
    console.warn('⚠️ No character tokens found in current scene');
    return;
  }
  
  const testToken = tokens[0];
  console.log('✅ Found test token:', testToken.name);
  
  // Enable camera following
  game.settings.set('character-cam', 'enabled', true);
  game.settings.set('character-cam', 'targetActorId', testToken.actor.id);
  
  console.log('✅ Camera following enabled for token:', testToken.name);
  console.log('Move the token to see the camera follow it!');
}

// Run tests
console.log('=== Character Cam Module Tests ===');
testCharacterCamModule();
testTokenMovement(); 