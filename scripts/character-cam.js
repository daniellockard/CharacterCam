/**
 * Character Cam Module
 * Automatically follows a selected character's movement with the camera
 */

class CharacterCam {
  constructor() {
    this.following = false;
    this.targetToken = null;
    this.cameraUpdateInterval = null;
    this.settings = {};
  }

  /**
   * Initialize the module
   */
  static init() {
    // Register module settings
    game.settings.register('character-cam', 'enabled', {
      name: 'Enable Camera Following',
      hint: 'Enable automatic camera following of selected character',
      scope: 'world',
      config: true,
      type: Boolean,
      default: false,
      onChange: (value) => {
        if (value) {
          CharacterCam.instance.startFollowing();
        } else {
          CharacterCam.instance.stopFollowing();
        }
      }
    });

    game.settings.register('character-cam', 'targetActorId', {
      name: 'Target Character',
      hint: 'Select which character the camera should follow',
      scope: 'world',
      config: true,
      type: String,
      default: '',
      choices: CharacterCam.getActorChoices,
      onChange: (value) => {
        CharacterCam.instance.updateTarget(value);
      }
    });

    game.settings.register('character-cam', 'smoothFollow', {
      name: 'Smooth Camera Movement',
      hint: 'Enable smooth camera transitions instead of instant snapping',
      scope: 'world',
      config: true,
      type: Boolean,
      default: true
    });

    game.settings.register('character-cam', 'followDistance', {
      name: 'Follow Distance',
      hint: 'Distance from the character to maintain (in grid units)',
      scope: 'world',
      config: true,
      type: Number,
      default: 2,
      range: {
        min: 0,
        max: 10,
        step: 0.5
      }
    });

    // Create singleton instance
    CharacterCam.instance = new CharacterCam();
    
    // Start following if enabled
    if (game.settings.get('character-cam', 'enabled')) {
      CharacterCam.instance.startFollowing();
    }

    // Register hooks
    Hooks.on('updateToken', CharacterCam.instance.onTokenUpdate.bind(CharacterCam.instance));
    Hooks.on('updateActor', CharacterCam.instance.onActorUpdate.bind(CharacterCam.instance));
    Hooks.on('deleteToken', CharacterCam.instance.onTokenDelete.bind(CharacterCam.instance));
    Hooks.on('deleteActor', CharacterCam.instance.onActorDelete.bind(CharacterCam.instance));
  }

  /**
   * Get available actor choices for the settings dropdown
   */
  static getActorChoices() {
    const choices = { '': 'None' };
    if (game.actors) {
      game.actors.forEach(actor => {
        if (actor.type === 'character') {
          choices[actor.id] = actor.name;
        }
      });
    }
    return choices;
  }

  /**
   * Start following the target character
   */
  startFollowing() {
    if (this.following) return;
    
    const targetActorId = game.settings.get('character-cam', 'targetActorId');
    if (!targetActorId) {
      ui.notifications.warn('No target character selected for camera following');
      return;
    }

    this.updateTarget(targetActorId);
    this.following = true;
    
    // Set up camera update interval
    this.cameraUpdateInterval = setInterval(() => {
      this.updateCameraPosition();
    }, 100); // Update 10 times per second

    ui.notifications.info('Camera following started');
  }

  /**
   * Stop following the target character
   */
  stopFollowing() {
    if (!this.following) return;
    
    this.following = false;
    this.targetToken = null;
    
    if (this.cameraUpdateInterval) {
      clearInterval(this.cameraUpdateInterval);
      this.cameraUpdateInterval = null;
    }

    ui.notifications.info('Camera following stopped');
  }

  /**
   * Update the target character
   */
  updateTarget(actorId) {
    if (!actorId) {
      this.targetToken = null;
      return;
    }

    // Find the token for this actor in the current scene
    const tokens = canvas.scene.tokens.filter(token => token.actor?.id === actorId);
    if (tokens.length > 0) {
      this.targetToken = tokens[0];
    } else {
      ui.notifications.warn(`No token found for actor ${actorId} in the current scene`);
      this.targetToken = null;
    }
  }

  /**
   * Update camera position to follow the target
   */
  updateCameraPosition() {
    if (!this.following || !this.targetToken || !this.targetToken.visible) {
      return;
    }

    const smoothFollow = game.settings.get('character-cam', 'smoothFollow');
    const followDistance = game.settings.get('character-cam', 'followDistance');
    
    // Get token center position
    const tokenCenter = this.targetToken.center;
    
    // Calculate target camera position with offset
    const targetPosition = {
      x: tokenCenter.x,
      y: tokenCenter.y
    };

    if (smoothFollow) {
      canvas.animatePan({ x: targetPosition.x, y: targetPosition.y });
    } else {
      canvas.pan({ x: targetPosition.x, y: targetPosition.y });
    }
  }

  /**
   * Handle token updates
   */
  onTokenUpdate(token, changes, options, userId) {
    if (this.following && this.targetToken && token.id === this.targetToken.id) {
      // Token position changed, update camera immediately
      this.updateCameraPosition();
    }
  }

  /**
   * Handle actor updates
   */
  onActorUpdate(actor, changes, options, userId) {
    if (this.following && this.targetToken && actor.id === this.targetToken.actor?.id) {
      // Actor data changed, might need to update target
      this.updateTarget(actor.id);
    }
  }

  /**
   * Handle token deletion
   */
  onTokenDelete(token, options, userId) {
    if (this.following && this.targetToken && token.id === this.targetToken.id) {
      ui.notifications.warn('Target token was deleted, stopping camera following');
      this.stopFollowing();
      game.settings.set('character-cam', 'enabled', false);
    }
  }

  /**
   * Handle actor deletion
   */
  onActorDelete(actor, options, userId) {
    if (this.following && this.targetToken && actor.id === this.targetToken.actor?.id) {
      ui.notifications.warn('Target actor was deleted, stopping camera following');
      this.stopFollowing();
      game.settings.set('character-cam', 'enabled', false);
    }
  }
}

// Initialize the module when Foundry is ready
Hooks.once('ready', () => {
  CharacterCam.init();
}); 