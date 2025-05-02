import fs from "fs";
import { expandToString } from "langium/generate";
import path from "path";

export function generate(target_folder: string) : void {

    fs.writeFileSync(path.join(target_folder, '_container.scss'), generateContainer());
    fs.writeFileSync(path.join(target_folder, '_customizer.scss'), generateCustomizer());
    fs.writeFileSync(path.join(target_folder, '_dark.scss'), generateDark());
    fs.writeFileSync(path.join(target_folder, '_horizontal.scss'), generateHorizontal());
    fs.writeFileSync(path.join(target_folder, '_reboot.scss'), generateReboot());
    fs.writeFileSync(path.join(target_folder, '_rtl.scss'), generateRtl());
    fs.writeFileSync(path.join(target_folder, '_sidebar.scss'), generateSidebar());
    fs.writeFileSync(path.join(target_folder, '_text.scss'), generateText());
    fs.writeFileSync(path.join(target_folder, '_topbar.scss'), generateTopbar());

}  

function generateContainer(): string {
    return expandToString`
html {
    overflow-y: auto;
}
.v-main{
    background:rgb(var(--v-theme-background)) !important; ;
}
@media (max-width: 1279px) {
    .v-main {
        margin: 0 10px;
    }
}

.cursor-pointer {
    cursor: pointer;
}

.page-wrapper {
    min-height: calc(100vh - 100px);
    padding: 24px;
    // border-radius: $border-radius-root;
    @media screen and (max-width: 767px) {
        padding: 20px 10px;
    }
}

.maxWidth {
    max-width: 1200px;
    margin: 0 auto;
}

.fixed-width {
    max-width: 1300px;
}

.right-pos-img {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
}`
}

function generateCustomizer(): string {
    return expandToString`
.v-btn.customizer-btn {
    display: none;
    position: fixed;
    bottom: 30px;
    right: 30px;
    border-radius: 50%;
    .icon-tabler-settings {
        animation: progress-circular-rotate 1.4s linear infinite;
        transform-origin: center center;
        transition: all 0.2s ease-in-out;
    }
}

.btn-group-custom {
    &.v-btn-group {
        height: 66px !important;
        overflow: unset !important;
        .v-btn {
            height: 66px !important;
            padding: 0 20px;
            border: 1px solid rgb(var(--v-theme-borderColor), 0.7);
            transition: all 0.1s ease-in 0s;
            &:hover {
                transform: scale(1.05);
            }
            &.text-primary {
                .v-btn__overlay {
                    background: transparent !important;
                }
                .icon {
                    color: rgb(var(--v-theme-primary)) !important;
                    fill: rgb(var(--v-theme-primary), 0.2);
                }
                color: rgb(var(--v-theme-textSecondary)) !important;
            }
        }
    }
}

.hover-btns {
    transition: all 0.1s ease-in 0s;
    &:hover {
        transform: scale(1.05);
    }
}

// all theme colors
.v-avatar.themeBlue,
.v-avatar.themeDarkBlue {
    background: #1a9bfc;
}
.v-avatar.themeRed,
.v-avatar.themeDarkRed {
    background: #ff5c8e;
}

.v-avatar.themePurple,
.v-avatar.themeDarkPurple {
    background: #7352ff;
}
.v-avatar.themeGreen,
.v-avatar.themeDarkGreen {
    background: #00cec3;
}

.v-avatar.themeIndigo,
.v-avatar.themeDarkIndigo {
    background: #1e4db7;
}

.v-avatar.themeOrange,
.v-avatar.themeDarkOrange {
    background: #fb9678;
}`
}

function generateDark(): string {
    return expandToString`
// theme : dark
div[class*='v-theme--DARK_'] {
    .smallCap {
        color: rgb(var(--v-theme-textSecondary));
    }

    .elevation-10 {
        box-shadow: rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 2%) 0px 12px 24px -4px !important;
    }
}`
}

function generateHorizontal(): string {
    return expandToString`

.horizontal-header  {
    &.v-app-bar .v-toolbar__content {
        padding: 0;
    }
}

.horizontalMenu  {
    .v-toolbar__content {
        max-width: 1270px;
        margin: 0 auto;
    }
}
.mobile-menu {
    .v-navigation-drawer {
        margin-top: -70px !important;
        height: 100vh !important;
        z-index: 2000 !important;
        box-shadow: 1px 2px 70px rgb(0 0 0 / 50%) !important;
    }
}
@media (min-width: 960px) {
    .horizontalMenu {
        margin-top: 65px;
        margin-bottom: -70px;
        .maxWidth {
            .horizontal-navbar {
                max-width: 1160px;
            }
        }
    }
    .horizontal-navbar {
        padding: 16px 0;
        margin: 0px auto;
        align-items: center;
        display: flex;
        z-index: 11;
        font-size: 0.875rem;
        position: relative;
        gap: 3px;
        ul {
            padding: 0px;
            margin: 0px;
        }
        li {
            list-style: none;
            a {
                color: inherit;
                text-decoration: none;
                display: flex;
                align-items: center;
                padding: 10px 13px;
                height: 40px;
                .navIcon {
                    margin-right: 10px;
                    display: flex;
                }
                .ddIcon {
                    margin-top: 2px;
                }
                &.router-link-exact-active {
                    background-color: rgb(var(--v-theme-secondary));
                    color: white !important;
                }
                &:hover {
                    color: rgb(var(--v-theme-secondary));
                }
            }
        }
        .navItem {
            position: relative;
        }
        .ddMenu {
            position: absolute;
            width: 230px;
            display: none;
            top: 42px;
            padding: 10px;
            z-index: 1;
            background-color: rgb(var(--v-theme-surface));
            box-shadow: $box-shadow;
            border-radius: $border-radius-root;
            li {
                margin-bottom: 3px;
            }
        }
        .ddLevel-2,
        .ddLevel-3 {
            top: -5px;
            left: 212px;
        }
        .navItem:hover {
            background-color: rgba(var(--v-theme-lightprimary),0.3);
            border-radius: $border-radius-root;
            // > a >
            // .ddIcon {
            //     transform: rotate(180deg);
            // }
            > .ddMenu {
                display: block;
            }
        }
        > li:hover {
            background-color: rgb(var(--v-theme-lightprimary));
            border-radius: $border-radius-root;
            > .navItemLink {
                color: rgb(var(--v-theme-secondary));
                opacity: 1;
            }
        }
        .router-link-exact-active {
            color: rgb(var(--v-theme-secondary));
            font-weight: 500;
            background-color: rgb(var(--v-theme-lightprimary));
            border-radius: $border-radius-root;
        }
    }
}`
}

function generateReboot(): string {
    return expandToString`
.h-100 {
    height: 100%;
}
.w-100 {
    width: 100%;
}

.h-100vh {
    height: 100vh;
}

.gap-2 {
    gap: 8px;
}

.gap-3 {
    gap: 16px;
}

.gap-4 {
    gap: 24px;
}

.text-white {
    color: rgb(255, 255, 255) !important;
}

// border
.border-bottom {
    border-bottom: 1px solid rgba(var(--v-theme-borderColor), 0.05);
}

.opacity-1 {
    opacity: 1 !important;
}

.opacity-50 {
    opacity: 0.5;
}

.z-auto.v-card {
    z-index: auto;
}

.obj-cover {
    object-fit: cover;
}
.cursor-move{
    cursor: move;
}` 
}

function generateRtl(): string {
    return expandToString`
.v-locale--is-rtl {
    .customizer-btn {
        left: 30px;
        right: unset;
    }

    .horizontal-navbar .icon-box {
        margin-left: 12px;
    }

    .v-navigation-drawer__scrim {
        inset: unset !important;
    }

    .bg-img-1 {
        position: absolute;
        bottom: 0;
        left: 0;
        right: unset !important;
        transform: scaleX(-1);
    }

    .ml-1 {
        margin-left: unset !important;
        margin-right: 4px;
    }

    .ml-2 {
        margin-left: unset !important;
        margin-right: 8px;
    }

    .mr-1 {
        margin-right: unset !important;
        margin-left: 4px;
    }

    .mr-2 {
        margin-right: unset !important;
        margin-left: 8px;
    }

    .mr-sm-2 {
        margin-right: unset !important;
        margin-left: 8px;
    }

    .mr-3 {
        margin-right: unset !important;
        margin-left: 12px !important;
    }

    .mr-4 {
        margin-right: unset !important;
        margin-left: 16px !important;
    }

    .ml-3 {
        margin-left: unset !important;
        margin-right: 12px !important;
    }

    .mr-auto {
        margin-left: auto !important;
        margin-right: unset !important;
    }

    .ml-4 {
        margin-left: unset !important;
        margin-right: 16px;
    }

    .ml-sm-4 {
        margin-left: unset !important;
        margin-right: 16px;
    }

    .ml-md-4 {
        margin-left: unset !important;
        margin-right: 16px;
    }

    .ml-sm-3 {
        margin-left: unset !important;
        margin-right: 12px;
    }


    .ml-5 {
        margin-left: unset !important;
        margin-right: 20px;
    }

    .ml-6 {
        margin-left: unset !important;
        margin-right: 24px;
    }

    .ml-10 {
        margin-left: unset !important;
        margin-right: 40px;
    }

    .pl-1 {
        padding-left: unset !important;
        padding-right: 4px !important;
    }

    .pl-2 {
        padding-left: unset !important;
        padding-right: 8px !important;
    }
    .pl-3{
        padding-left: unset !important;
        padding-right: 12px !important;
    }

    .pr-2 {
        padding-left: 8px !important;
    }

    .pr-4 {
        padding-left: 16px !important;
        padding-right: unset !important;
    }

    .pl-4 {
        padding-left: unset !important;
        padding-right: 16px !important;
    }

    .right-pos-img {
        right: unset;
        left: 0;
        transform: scaleX(-1);
        top: 0;
    }

    .badg-dotDetail {
        left: 0;
        right: -8px;
    }


    .text-right {
        text-align: left !important;
    }

    .text-sm-right,
    .text-md-right {
        text-align: left !important;
    }

    .text-sm-left {
        text-align: right !important;
    }

    .text-left {
        text-align: right !important;
    }

    .ml-auto,
    .ml-sm-auto {
        margin-left: unset !important;
        margin-right: auto !important;
    }

    .justify-start {
        justify-content: flex-end !important;
    }

    .vertical-table .v-table>.v-table__wrapper>table>tbody>tr>th {
        border-left: thin solid rgba(var(--v-border-color), 1) !important;
    }

    .authentication .auth-header {
        left: unset;
        right: 0;
    }

    .horizontal-navbar li a {
        padding-left: 20px;
        padding-right: 0;
    }

    .horizontal-navbar {
        li {
            margin-right: 0;
            margin-left: 15px;

            a {
                padding-left: 20px;
                padding-right: 0;
            }
        }
    }

    // &.v-menu .v-overlay__content,
    // &.search_popup .v-overlay__content,
    // &.language_dropdown .v-overlay__content,
    // &.notification_popup .v-overlay__content,
    // &.profile_popup .v-overlay__content {
    //     left: inherit;
    // }

    .related-Product {
        .carousel__prev.navarrow {
            top: 0;
            right: unset !important;
            left: 0;
        }

        .carousel__next.navarrow {
            top: 0;
            right: unset !important;
            left: 45px;
        }
    }

    //RTL mode minisidebar hover to active scrollbar
    .ps--active-y>.ps__rail-y {
        right: unset !important;
        left: 0;
    }

    //RTL mode sidebar scrollbar on right side
    .left-customizer {
        .ps__rail-y {
            right: 0 !important;
        }
    }

    .horizontal-navbar .ddMenu {
        padding: 10px 15px 10px 0px;
    }

    .v-list-group__items {
        .iconClass {
            position: relative;
            left: unset;
            right: -2px;
        }
    }

    @media (min-width: 960px) {

        .horizontal-navbar .ddLevel-2,
        .horizontal-navbar .ddLevel-3 {
            top: -5px;
            right: 212px;
        }

        .horizontal-navbar li a .navIcon {
            margin-right: 0;
            margin-left: 10px;
        }
    }

    .leftSidebar .profile-name h5 {
        direction: ltr;
    }

    .horizontal-navbar{
        .ddMenu{
            .navItemLink{
                padding-right: 15px;
            }
        }
    }

    @media screen and (max-width:1279px) {
        .mini-sidebar {
            .v-navigation-drawer.v-navigation-drawer--right {
                width: 270px !important;
            }
            .v-navigation-drawer.v-navigation-drawer--left {
                width: 320px !important;
            }
        }
        
    }

}`
}

function generateSidebar(): string {
    return expandToString`
/*This is for the logo*/
.leftSidebar {
    box-shadow: 1px 0 20px #00000014!important;
    .mini-icon {
        display: none;
    }

    .mini-text {
        display: block;
    }
      .profile-name {
        background: rgba(0, 0, 0, 0.5);
        h5 {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .v-list--density-default .v-list-subheader{
        padding-inline-start:0 !important;
    }
}
.verticalLayout{
    .logo{
        @media screen and (max-width:1024px) {
            width: auto;
        }
    }
}

/*This is for the Vertical sidebar*/
.scrollnavbar {
    height: calc(100vh - 100px);
    .userbottom {
        position: fixed;
        bottom: 0px;
        width: 100%;
    }

    .smallCap {
        padding: 3px 12px  12px 0px !important;
        font-size: 0.875rem;
        font-weight: 500;
        margin-top: 24px;
        color: rgb(var(--v-theme-textPrimary));

        &:first-child {
            margin-top: 0 !important;
        }
    }

    /*General Menu css*/
    .v-list-group__items .v-list-item,
    .v-list-item {
        border-radius: $border-radius-root;
        padding-inline-start: calc(12px + var(--indent-padding) / 10) !important;

        margin: 0 0 2px;

        &:hover {
            color: rgb(var(--v-theme-secondary));
        }

        .v-list-item__prepend {
            margin-inline-end: 13px;
        }

        .v-list-item__append {
            font-size: 0.875rem;

            .v-icon {
                margin-inline-start: 13px;
            }
        }

        .v-list-item-title {
            font-size: 0.875rem;
        }
    }

    /*This is for the dropdown*/
    .v-list {
        color: rgb(var(--v-theme-textSecondary));

        > .v-list-item.v-list-item--active,
        .v-list-item--active > .v-list-item__overlay {
            background: rgb(var(--v-theme-secondary));
            color: white;
        }

        > .v-list-group {
            position: relative;

            > .v-list-item--active,
            > .v-list-item--active:hover {
                background: rgb(var(--v-theme-secondary));
                color: white;
            }

            .v-list-group__items .v-list-item.v-list-item--active,
            .v-list-group__items .v-list-item.v-list-item--active > .v-list-item__overlay {
                background: transparent;
                color: rgb(var(--v-theme-secondary));
            }
        }
    }
}

.v-navigation-drawer--rail {
    .scrollnavbar .v-list .v-list-group__items,
    .hide-menu {
        opacity: 1;
    }

    .leftPadding {
        margin-left: 0px;
    }
}

@media only screen and (min-width: 1170px) {
    .mini-sidebar {
        .logo {
            width: 40px;
            overflow: hidden;
            padding-left: 0;
        }
        .profile-logout{
            opacity: 0;
            width: 0;
        }
        .leftSidebar .v-list--density-default .v-list-subheader{
            padding-inline-start:12px !important;
        }
        .scrollnavbar {
            .smallCap {
                padding: 3px 12px  12px 12px !important;
            }
        }
        .mini-icon {
            display: block;
        }

        .sidebarchip.hide-menu{
            opacity: 0;
        }

        .mini-text {
            display: none;
        }

        .v-list {
            padding: 14px !important;
        }

        .v-list-group__items{
            .iconClass{
                position: relative;
                left: -2px;
            }
        }  

        .leftSidebar:hover {
            box-shadow: $box-shadow !important;

            .mini-icon {
                display: none;
            }

            .sidebarchip.hide-menu{
                opacity:1;
            }

            .mini-text {
                display: block;
            }
            .profile-logout{
                opacity: 1;
                width: auto;
            }
            .scrollnavbar {
                .smallCap {
                    padding: 3px 12px  12px 0px !important;
                }
            }

            .v-list-group__items{
                .iconClass{
                    position: relative;
                    left: 0px;
                }
            }
            .v-list--density-default .v-list-subheader{
                padding-inline-start:0px !important;
            }
        }

        .v-navigation-drawer--expand-on-hover:hover {
            .logo {
                width: 100%;
            }

            .v-list .v-list-group__items,
            .hide-menu {
                opacity: 1;
            }
        }
    }
}

// scrollbar 
.ps__rail-y {
    z-index: 9;
}`
}

function generateText(): string {
    return expandToString`
$sizes: (
    'display-1': 44px,
    'display-2': 40px,
    'display-3': 30px,
    'h1': 36px,
    'h2': 30px,
    'h3': 21px,
    'h4': 18px,
    'h5': 16px,
    'h6': 14px,
    'text-10': 10px,
    'text-13': 13px,
    'text-18': 18px,
    'text-20': 20px,
    'text-24': 24px,
    'body-text-1': 10px
);

@each $pixel, $size in $sizes {
    .#{$pixel} {
        font-size: $size;
        line-height: $size + 10;
    }
}

.textSecondary {
    color: rgb(var(--v-theme-textSecondary)) !important;
}

.textPrimary {
    color: rgb(var(--v-theme-textPrimary)) !important;
}

// line height

.lh-md {
    line-height: 1.57;
}

.font-weight-semibold {
    font-weight: 600;
}

// hover text
.text-hover-primary {
    color: rgb(var(--v-theme-textPrimary));
    &:hover {
        color: rgb(var(--v-theme-primary));
    }
}

.link {
    color: rgb(var(--v-theme-textSecondary));
    text-decoration: none;
    &:hover {
        color: rgb(var(--v-theme-primary));
    }
}`
}

function generateTopbar(): string {
    return expandToString`
.v-app-bar {
    .v-toolbar__content {
        padding: 0 15px;
        > .v-btn:first-child {
            margin-inline-start: 0;
        }
        .v-btn {
            color: rgba(var(--v-theme-textsurface)) !important;
        }
    }
}


.custom-text-primary {
    &.v-list-item:hover > .v-list-item__overlay {
        display: none;
    }
    .custom-title {
        color: rgb(var(--v-theme-textPrimary)) !important;
    }
    &:hover {
        .custom-title {
            color: rgb(var(--v-theme-primary)) !important;
        }
    }
}
@media screen and (max-width:1279px) {
    .mini-sidebar {
        .v-navigation-drawer.v-navigation-drawer--left {
            width: 270px !important;
        }
    }
}`
}