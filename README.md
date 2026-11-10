# CIRCLE BATTLE

CIRCLE BATTLE is a lightweight HTML5 Canvas orb-battle game.

## Run locally

1. Download or clone this repository.
2. Keep `index.html` and `game.js` in the same folder.
3. Open `index.html` in a modern browser.

No build tools or external libraries are required.

## Current gameplay

- 100 selectable orb skins, organized into collection categories.
- Two orbs move around the arena and bounce off the arena walls.
- Orb-to-orb contact only causes a physical bounce. It does **not** reduce HP.
- Weapons damage an opponent only when their projectile or orbiting weapon hits the opponent's orb body.
- Weapon-to-weapon contact is ignored and does not cause damage.

## Orb features and weapons

| Orb | Feature / weapon | Behaviour |
|---|---|---|
| Ma Cà Rồng | Two small fangs + dagger | Heals a small amount when its attack hits |
| Chiến Sĩ | Sword + shield | Shield blocks an incoming hit, then recharges |
| Pháp Sư | Staff | Fires magic projectiles |
| Cung Thủ | Bow | Fires arrows |
| Mặt Trời | Light beam | Fires a bright beam projectile |
| Cá Mập | Shark fin + water blade | Has a simple fin silhouette and orbiting water blade |
| Other orbs | Assigned weapon type | Uses a simple orbiting weapon or projectile |

The art direction stays deliberately simple: round bodies, clear colors, and a small number of identifying details. It avoids anime styling and complex character bodies.

## Controls

- **Chơi lại**: restart the current run from round 1.
- **Round tiếp**: advance after the current round ends.
- **Skin & Năng lực**: open the collection.
- Select an orb and choose **Trang bị!** to use it in the next fight.

## Files

- `index.html`: page layout and styles.
- `game.js`: orb data, drawing, movement, projectiles, weapon collision, HP and round flow.

## Notes

This is an in-progress prototype. The combat and collision rules are implemented in the browser game, but balance values, additional weapon variations, richer animation, persistence, and mobile tuning remain under development.
