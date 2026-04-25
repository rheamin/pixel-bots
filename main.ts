
tiles.setCurrentTilemap(assets.tilemap`arena`)

let player1 = sprites.create(assets.image`hammerBot`, SpriteKind.Player)

// button events

controller.player1.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function() {   
    sprites.setDataNumber(player1, "turning", 1)
})

controller.player1.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Released, function () {
    sprites.setDataNumber(player1, "turning", 0)
})

controller.player1.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    sprites.setDataNumber(player1, "turning", 2)
})

controller.player1.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Released, function () {
    sprites.setDataNumber(player1, "turning", 0)
})

controller.player1.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function() {
    spriteutils.setVelocityAtAngle(player1, spriteutils.degreesToRadians(spriteFx.rotation(player1)), 50)
})

controller.player1.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Released, function () {
    spriteutils.setVelocityAtAngle(player1, spriteutils.degreesToRadians(spriteFx.rotation(player1)), 0)
})

// sprite events

sprites.onCreated(SpriteKind.Player, function(sprite: Sprite) {
    /**
     * 0 -> not turning
     * 1 -> LeftmyImage
     * 2 -> Right
     */
    sprites.setDataNumber(sprite, "turning", 0) 
})

spriteutils.onSpriteKindUpdateInterval(SpriteKind.Player, 100, function(sprite: Sprite) {
    switch (sprites.readDataNumber(sprite, "turning")) {
        case 1:
            spriteFx.rotate(sprite, -10)
            console.log(spriteFx.rotation(sprite))
            break
        case 2:
            spriteFx.rotate(sprite, 10)
            console.log(spriteFx.rotation(sprite))
            break
        case 0:
        default:
            break
    }
    // adjust sprite movement
    if (sprite.vx != 0 || sprite.vy != 0) {
        spriteutils.setVelocityAtAngle(sprite, spriteutils.degreesToRadians(spriteFx.rotation(sprite)), 50)
    }
})
