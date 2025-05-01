import fs from "fs";
import { expandToString } from "langium/generate";
import path from "path";

export function generate(target_folder: string) : void {

    fs.writeFileSync(path.join(target_folder, '_VAlert.scss'), generateValert());
    fs.writeFileSync(path.join(target_folder, '_VBreadcrumb.scss'), generateVBreadcrumbs());
    fs.writeFileSync(path.join(target_folder, '_VButtons.scss'), generateVButtons());
    fs.writeFileSync(path.join(target_folder, '_VCard.scss'), generateVcard());
    fs.writeFileSync(path.join(target_folder, '_VCarousel.scss'), generateVCarousel());
    fs.writeFileSync(path.join(target_folder, '_VDatatable.scss'), generateVDatable());
    fs.writeFileSync(path.join(target_folder, '_VExpansionpanel.scss'), generateVExpansionpanel());
    fs.writeFileSync(path.join(target_folder, '_VField.scss'), generateVField());
    fs.writeFileSync(path.join(target_folder, '_VInput.scss'), genrateVInput());
    fs.writeFileSync(path.join(target_folder, '_VList.scss'), generateVList());
    fs.writeFileSync(path.join(target_folder, '_VNavigationDrawer.scss'), generateVNavigationDrawer());
    fs.writeFileSync(path.join(target_folder, '_VSelectionControl.scss'), generateVSelectionControl());
    fs.writeFileSync(path.join(target_folder, '_VShadow.scss'), generateVShadow());
    fs.writeFileSync(path.join(target_folder, '_VTabs.scss'), generateVTabs());
    fs.writeFileSync(path.join(target_folder, '_VSwitch.scss'), generateVSwitch());
    fs.writeFileSync(path.join(target_folder, '_VTable.scss'), generateVTable());
    fs.writeFileSync(path.join(target_folder, '_VTextField.scss'), generateTextField());
    fs.writeFileSync(path.join(target_folder, '_VTextarea.scss'), generateVTextArea());
    fs.writeFileSync(path.join(target_folder, '_VTimeline.scss'), generateVTimeline());

}  

function generateValert(): string {
    return expandToString`
.single-line-alert {
    .v-alert__close,
    .v-alert__prepend {
        align-self: center !important;
    }
}

@media (max-width: 500px) {
    .single-line-alert {
        display: flex;
        flex-wrap: wrap;
       
        .v-alert__append {
            margin-inline-start: 0px;
        }
        .v-alert__close {
            margin-left: auto;
        }
        .v-alert__content {
            width: 100%;
            margin-top: 5px;
        }
    }
}`
}

function generateVBreadcrumbs(): string {
    return expandToString`
`
}

function generateVButtons(): string {
    return expandToString`
.v-btn-group .v-btn {
    height: inherit !important;
}

.v-btn-group {
    border-color: rgb(var(--v-theme-borderColor)) !important;
}
.v-btn{
    text-transform: capitalize;
    letter-spacing: 0;
}
.v-btn--elevated:hover{
    box-shadow: none;
}`
}

function generateVcard(): string {
    return expandToString`
// Outline Card
.v-card--variant-outlined {
    border-color: rgba(var(--v-theme-borderColor)) !important;
}

.v-card--variant-elevated,
.v-card--variant-flat {
    color: rgb(var(--v-theme-textPrimary));
}

.card-hover {
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    &:hover {
        scale: 1.01;
        transition: all 0.1s ease-in 0s;
    }
}

.v-card {
    width: 100%;
    overflow: hidden;
    .color-inherits {
        color: inherit;
    }
    .feature-card {
        .v-responsive__content {
            height: 100%;
        }
    }
    .v-timeline-divider__before,.v-timeline-divider__after {
        background: rgba(var(--v-border-color), 1);
    }
}

// Theme cards
.cardBordered {
    .v-card {
        box-shadow: none !important;
        border: 1px solid rgb(var(--v-theme-borderColor));
    }
}

.elevation-o-card{
    .v-card-item{
        padding: 0.625rem 1rem;
    }
}`
}

function generateVCarousel(): string {
    return expandToString`
.theme-carousel .v-carousel__progress {
  position: absolute;
}`
}

function generateVDatable(): string {
    return expandToString`
.v-pagination__item--is-active .v-btn__overlay {
    opacity: 0.15 !important;
}`
}

function generateVExpansionpanel(): string {
    return expandToString`
.v-expansion-panel-title__overlay{
    background: rgba(var(--v-theme-primary));
}
.v-expansion-panel:not(:first-child)::after {
    border-color: transparent !important;
}`
}

function generateVField(): string {
    return expandToString`
.v-field--variant-outlined .v-field__outline__start.v-locale--is-ltr,
.v-locale--is-ltr .v-field--variant-outlined .v-field__outline__start {
    border-radius: $border-radius-root 0 0 $border-radius-root;
}

.v-field--variant-outlined .v-field__outline__end.v-locale--is-ltr,
.v-locale--is-ltr .v-field--variant-outlined .v-field__outline__end {
    border-radius: 0 $border-radius-root $border-radius-root 0;
}

.v-field {
    font-size: 14px;
    color:  rgba(var(--v-theme-textPrimary));
}

// select outlined
.v-field--variant-outlined .v-field__outline__start,
.v-field--variant-outlined .v-field__outline__notch::before,
.v-field--variant-outlined .v-field__outline__notch::after,
.v-field--variant-outlined .v-field__outline__end {
    opacity: 1;
}`
}

function genrateVInput(): string{
    return expandToString`
// variant
.v-input--density-default,
.v-field--variant-solo,
.v-field--variant-filled {
    --v-input-control-height: 51px;
    --v-input-padding-top: 14px;
}

// comfortable
.v-input--density-comfortable {
    --v-input-control-height: 44px;
}

// compact
.v-input--density-compact {
    --v-input-padding-top: 10px;
}
.v-label {
    font-size: 0.875rem;
    opacity: 1;
}
.v-switch .v-label,
.v-checkbox .v-label {
    opacity: 1;
}

.v-text-field__suffix {
    opacity: 1;
    padding-left: 20px;
}

.shadow-none .v-field--variant-solo {
    box-shadow: none !important;
}`
}

function generateVList(): string {
    return expandToString`
.v-list.theme-list {
    .v-list-item:hover > .v-list-item__overlay {
        opacity: 1;
        z-index: 1;
    }
    .v-list-item--variant-text {
        .v-list-item__overlay {
            background: rgb(var(--v-theme-hoverColor));
        }
    }

    .v-list-item__prepend,
    .v-list-item__content {
        z-index: 2;
    }

    .v-list-item__overlay {
        background-color: rgb(var(--v-theme-hoverColor));
    }
}`
}

function generateVNavigationDrawer(): string {
    return expandToString`
.v-navigation-drawer__scrim.fade-transition-leave-to {
  display: none;
}`
}

function generateVSelectionControl(): string {
    return expandToString`
// For checkbox & radios
.v-selection-control__input > .v-icon.mdi-checkbox-blank-outline,
.v-selection-control__input > .v-icon.mdi-radiobox-blank {
    color: rgb(var(--v-theme-inputBorder));
    opacity: 1;
}`
}

function generateVShadow(): string {
    return expandToString`
.elevation-9 {
  box-shadow: rgb(0 0 0 / 5%) 0px 9px 17.5px !important;
}

.elevation-10 {
  box-shadow: $box-shadow !important;
}

.primary-shadow {
  box-shadow: rgba(var(--v-theme-primary), 0.30) 0px 12px 14px 0px;
  &:hover {
    box-shadow: none;
  }
}`
}

function generateVSwitch(): string{
    return expandToString`
.v-selection-control.v-selection-control--density-default {
    .v-switch__track,
    .v-switch__thumb {
        background-color: rgb(var(--v-theme-grey200));
    }
    &.v-selection-control--dirty {
        .v-selection-control__wrapper.text-primary {
            .v-switch__track {
                background-color: rgba(var(--v-theme-primary), 0.6);
            }
            .v-switch__thumb {
                background-color: rgb(var(--v-theme-primary));
            }
        }
        .v-selection-control__wrapper.text-secondary {
            .v-switch__track {
                background-color: rgba(var(--v-theme-secondary), 0.6);
            }
            .v-switch__thumb {
                background-color: rgb(var(--v-theme-secondary));
            }
        }
        .v-selection-control__wrapper.text-warning {
            .v-switch__track {
                background-color: rgba(var(--v-theme-warning), 0.6);
            }
            .v-switch__thumb {
                background-color: rgb(var(--v-theme-warning));
            }
        }
        .v-selection-control__wrapper.text-error {
            .v-switch__track {
                background-color: rgba(var(--v-theme-error), 0.6);
            }
            .v-switch__thumb {
                background-color: rgb(var(--v-theme-error));
            }
        }
        .v-selection-control__wrapper.text-success {
            .v-switch__track {
                background-color: rgba(var(--v-theme-success), 0.6);
            }
            .v-switch__thumb {
                background-color: rgb(var(--v-theme-success));
            }
        }
    }
}`
}

function generateVTable(): string {
    return expandToString`
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th,
.v-table .v-table__wrapper > table > thead > tr:last-child > th {
    border-bottom: thin solid rgba(var(--v-border-color), 1) !important;
}

.v-data-table{
    th.v-data-table__th{
        font-size:16px;
        color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    }
    td.v-data-table__td{
        font-size: 14px;
        text-wrap: nowrap;
    }
    .v-data-table-footer{
        padding: 15px 8px;
    }
    .v-data-table-header__sort-badge{
        background-color:rgb(var(--v-theme-borderColor)) !important;
    }
    .tdhead{
        font-size:16px;
    }
}
@media screen and (max-width:767px) {
    .v-data-table-footer{
        justify-content: center;
    }
}`
}

function generateVTabs(): string {
    return expandToString`
.theme-tab {
    &.v-tabs {
        .v-tab {
            border-radius: $border-radius-root !important;
            min-width: auto !important;
            &.v-slide-group-item--active {
                background: rgb(var(--v-theme-primary));
                
            }
        }
    }
}`
}

function generateTextField(): string {
    return expandToString`
.v-text-field input {
  font-size: 0.875rem;
}
.v-field__outline {
  color: rgb(var(--v-theme-inputBorder));
  --v-field-border-opacity: 1 !important;
}
.input {
  .v-field--variant-outlined {
    background-color: rgba(0, 0, 0, 0.025);
  }
}`
}

function generateVTextArea(): string {
    return expandToString`
.v-textarea input {
  font-size: 0.875rem;
  font-weight: 500;
  &::placeholder {
    color: rgba(0, 0, 0, 0.38);
  }
}`
}

function generateVTimeline(): string {
    return expandToString`
.v-timeline--vertical.v-timeline.v-timeline--side-end .v-timeline-item .v-timeline-item__body{
    justify-self: auto;
}`
}