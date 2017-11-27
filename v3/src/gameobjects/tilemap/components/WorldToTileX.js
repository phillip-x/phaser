/**
 * Converts from world X coordinates (pixels) to tile X coordinates (tile units), factoring in the
 * layer's position, scale and scroll.
 *
 * @param {number} worldX - [description]
 * @param {boolean} [snapToFloor=true] - Whether or not to round the tile coordinate down to the
 * nearest integer.
 * @param {Camera} [camera=main camera] - [description]
 * @param {LayerData} layer - [description]
 * @returns {number} The X location in tile units.
 */
var WorldToTileX = function (worldX, snapToFloor, camera, layer)
{
    if (snapToFloor === undefined) { snapToFloor = true; }

    var tileWidth = layer.tileWidth;
    var tilemapLayer = layer.tilemapLayer;

    if (tilemapLayer)
    {
        if (camera === undefined) { camera = tilemapLayer.scene.cameras.main; }

        // Find the world position relative to the static or dynamic layer's top left origin,
        // factoring in the camera's horizontal scroll
        worldX = worldX + (camera.scrollX * tilemapLayer.scrollFactorX) - tilemapLayer.x;

        tileWidth *= tilemapLayer.scaleX;
    }

    return snapToFloor
        ? Math.floor(worldX / tileWidth)
        : worldX / tileWidth;
};

module.exports = WorldToTileX;
