export function getTheme(): "dark" | "light" {
  const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");

  const localTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")!
    : null;

  const theme =
    localTheme != null ? localTheme : darkTheme.matches ? "dark" : "light";

  return theme as theme;
}

export type theme = "light" | "dark";
