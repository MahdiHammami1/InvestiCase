Navbar component

This upgraded navbar implements:

- Responsive layout with a hamburger toggle for small screens.
- Accessible attributes (aria-controls, aria-expanded, escape-to-close).
- Active route highlighting using `routerLinkActive`.
- Theme toggle which adds/removes `dark-theme` on the `<html>` element.
- Placeholder user initials avatar (replace `userName` in the component with real auth data).

How to use

- `app-navbar` is the selector. Place it in the layout template.
- To provide a real user, wire authentication and set `userName` in `NavbarComponent`.
- Customize colors by editing CSS variables in the component stylesheet or by overriding them globally.
