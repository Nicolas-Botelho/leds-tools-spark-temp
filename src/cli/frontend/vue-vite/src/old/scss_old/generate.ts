import { Model } from "../../../../../language/generated/ast.js"
import fs from "fs";
import { createPath } from "../../../../util/generator-utils.js";
import { expandToString } from "langium/generate";
import path from "path";
import { generate as generateComponents } from "./components/generate.js";
import { generate as generateLayout } from "./layout/generate.js";
import { generate as generatePages } from "./pages/generate.js";

export function generate(model: Model, target_folder: string) : void {
    
    const components_folder = createPath(target_folder, "components")
    const layouts_folder = createPath(target_folder, "layout")
    const pages_folder = createPath(target_folder, "pages")

    fs.mkdirSync(pages_folder, {recursive:true})
    fs.mkdirSync(layouts_folder, {recursive:true})
    fs.mkdirSync(components_folder, {recursive:true})

    fs.writeFileSync(path.join(target_folder, 'style.scss'), generateStyle());
    fs.writeFileSync(path.join(target_folder, '_variables.scss'), generateVariables());
    fs.writeFileSync(path.join(target_folder, '_override.scss'), generateOverride());

    generateComponents(components_folder);
    generateLayout(layouts_folder);
    generatePages(pages_folder);

}  

function generateStyle(): string {
    return expandToString`
@import './variables';
@import 'vuetify/styles.scss';
@import './override';
@import './layout/text';
@import './layout/reboot';
@import './layout/container';
@import './layout/sidebar';
@import './layout/topbar';
@import './layout/horizontal';
@import './layout/customizer';

@import './components/VBreadcrumb';
@import './components/VAlert';
@import './components/VButtons';
@import './components/VCard';
@import './components/VField';
@import './components/VList';
@import './components/VInput';
@import './components/VNavigationDrawer';
@import './components/VShadow';
@import './components/VSwitch';
@import './components/VSelectionControl';
@import './components/VTextField';
@import './components/VTextarea';
@import './components/VTabs';
@import './components/VTable';
@import './components/VExpansionpanel';
@import './components/VTimeline';
@import './components/VDatatable';

@import './pages/datatable';
@import './pages/editor';
@import './pages/authentication';
@import './pages/apps';
`
}

function generateVariables(): string {
    return expandToString`
@use 'sass:math';
@use 'sass:map';
@use 'sass:meta';
//@use 'vuetify/lib/styles/tools/functions' as *;

// Custom Variables
// colors
$white: #fff !default;

// cards
$card-title-size: 18px !default;

$body-font-family: 'DM Sans', sans-serif !default;
$border-radius-root: 7px;
$btn-font-weight: 400 !default;
$btn-letter-spacing: 0 !default;

// Global Shadow
$box-shadow: rgba(145 158 171 / 30%) 0px 0px 2px 0px, rgba(145 158 171 / 12%) 0px 12px 24px -4px;

// Global Radius as per breakeven point

@forward 'vuetify/settings' with (
    $color-pack: false !default,
    // Global font size and border radius
    $font-size-root: 1rem,
    $border-radius-root: $border-radius-root,
    $body-font-family: $body-font-family,
    $heading-font-family: $body-font-family !default,
    // 👉 Typography
    $typography:
        (
            'h1': (
                'size': 2.25rem,
                'weight': 600,
                'line-height': 2.75rem,
                'font-family': inherit
            ),
            'h2': (
                'size': 1.875rem,
                'weight': 500,
                'line-height': 2.25rem,
                'font-family': inherit
            ),
            'h3': (
                'size': 1.5rem,
                'weight': 500,
                'line-height': 2rem,
                'font-family': inherit
            ),
            'h4': (
                'size': 1.25rem,
                'weight': 500,
                'line-height': 1.6rem,
                'font-family': inherit
            ),
            'h5': (
                'size': 1.125rem,
                'weight': 500,
                'line-height': 1.6rem,
                'font-family': inherit
            ),
            'h6': (
                'size': 1rem,
                'weight': 500,
                'line-height': 1.2rem,
                'font-family': inherit
            ),
            'subtitle-1': (
                'size': 0.875rem,
                'weight': 400,
                'line-height': 1.1rem,
                'font-family': inherit
            ),
            'subtitle-2': (
                'size': 0.75rem,
                'weight': 400,
                'line-height': 1rem,
                'font-family': inherit
            ),
            'body-1': (
                'size': 0.875rem,
                'weight': 400,
                'font-family': inherit
            ),
            'body-2': (
                'size': 0.75rem,
                'weight': 400,
                'font-family': inherit
            ),
            'button': (
                'size': 0.875rem,
                'weight': 500,
                'font-family': inherit,
                'text-transform': capitalize
            ),
            'caption': (
                'size': 0.75rem,
                'weight': 400,
                'font-family': inherit
            ),
            'overline': (
                'size': 0.75rem,
                'weight': 500,
                'font-family': inherit,
                'text-transform': uppercase
            )
        )
        !default,
    // 👉 Button
    $button-border-radius: $border-radius-root !default,
    $button-text-letter-spacing: 0 !default,
    $button-text-transform: capitalize,
    $button-elevation: (
        'default': 0,
        'hover': 4,
        'active': 8
    )
    !default,

    // 👉 Tooltip
    $tooltip-background-color: #212121 !default,
    $tooltip-text-color: #fff !default,
    $tooltip-font-size: 0.75rem !default,
    $tooltip-border-radius: 4px !default,
    $tooltip-padding: 4px 8px !default,

    // 👉 Rounded
    $rounded:
        (
            0: 0,
            'sm': $border-radius-root * 0.5,
            null: $border-radius-root,
            'md': $border-radius-root * 1,
            'lg': $border-radius-root * 2,
            'xl': $border-radius-root * 6,
            'pill': 9999px,
            'circle': 50%
        ),

    // 👉 Card
    // $card-color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity)) !default,
    $card-elevation: 10 !default,
    $card-title-line-height: 1.6 !default,
    $card-text-padding: 24px !default,
    $card-item-padding: 30px 30px 24px !default,
    $card-actions-padding: 10px 24px 24px !default,
    $card-subtitle-opacity: 1 !default,
    // $card-border-color	$border-color-root
);`
}

function generateOverride(): string {
    return expandToString`
html {
    .bg-success {
        color: white !important;
    }

    .bg-primary {
        color: $white !important;
    }

    .bg-secondary {
        color: $white !important;
    }

    .bg-warning,.bg-error {
        color: $white !important;
    }
}

.border,
.v-divider {
    border-color: rgba(var(--v-border-color), 1) !important;
}
.avtar-border {
    border: 2px solid rgb(var(--v-theme-surface)) !important;
}
.subtext{
    font-size: $font-size-root;
    line-height: 1.75rem;
}
.border-right {
    border-right: 1px solid rgba(var(--v-border-color), 1) !important;
}`
}