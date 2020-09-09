# Makeover

## Splash Screen

1. Add a splash screen and the associated styles.

- Copy `/react-course/concepts/assets/logo-splash-screen.svg` into `keeptrack\public\assets`

#### public\index.html

```diff
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
+    <style>
+      html,
+      body,
+      #root,
+      .container,
+      .center-page {
+        height: 100%;
+      }
+
+      .center-page {
+        display: flex;
+        justify-content: center;
+        align-items: center;
+      }
+
+      .loading {
+        background-color: #dddddd;
+      }
+    </style>
    <title>React App</title>
  </head>
...

```

```diff
...
    <div id="root">
+      <div class="center-page loading">
+        <img src="/assets/logo-splash-screen.svg" alt="logo" />
+      </div>
    </div>
...
```

2. Refresh the app from the root (localhost:3000).

- Open `Chrome DevTools` > `Network Tab` > in the dropdown at the top change `Online` to `Fast 3g` to see the splash screen more easily.

> The splash-screen svg is a logo with animation to fade in and out to produce an effect like Gmail when the app first loads.

## Skeleton Screen

## Page Transitions

## Alerts & Confirmations

## Fonts

## Colors

## Icons
