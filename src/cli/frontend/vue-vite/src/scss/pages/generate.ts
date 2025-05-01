import fs from "fs";
import { expandToString } from "langium/generate";
import path from "path";

export function generate(target_folder: string) : void {

    fs.writeFileSync(path.join(target_folder, '_apps.scss'), generateApps());
    fs.writeFileSync(path.join(target_folder, '_authentication.scss'), generateAuthentication());
    fs.writeFileSync(path.join(target_folder, '_dashboards.scss'), generateDashboard());
    fs.writeFileSync(path.join(target_folder, '_datatable.scss'), generateDatatable());
    fs.writeFileSync(path.join(target_folder, '_editor.scss'), generateEditor());

}  

function generateApps(): string {
    return expandToString`
// 
// common
// 

.inside-left-sidebar {
    .left-part {
        width: 240px;
    }
}

//
//Full Calendar
.fc {
	.fc-button-group {
		>.fc-button {
			display: flex;
			align-items: center;
			padding: 6px 22px;

		}
	}
	.fc-button {
		font-size: 1rem;
		font-weight: 500;
		text-transform: capitalize;

		.fc-icon {
			font-size: 1.5em;
			vertical-align: unset;
		}
	}
	.fc-button-primary {
		background: transparent;
		border-color: rgb(var(--v-theme-primary));
        color: rgb(var(--v-theme-primary));

        &:hover{
            background-color: rgb(var(--v-theme-primary));
            border-color: rgb(var(--v-theme-primary));
        }

		&:not(:disabled).fc-button-active {
			background-color: rgb(var(--v-theme-primary));
			border-color: rgb(var(--v-theme-primary));
			&:focus {
				box-shadow: none;
			}
		}
		&:not(:disabled) {
			&:active {
				background-color: rgb(var(--v-theme-primary));
				border-color: rgb(var(--v-theme-primary));
				&:focus {
					box-shadow: none;
				}
			}
		}
        &:disabled{
            background-color: rgb(var(--v-theme-primary));
			border-color: rgb(var(--v-theme-primary));
            opacity: 1;
        }
	}
	.fc-col-header-cell-cushion {
		display: inline-block;
		padding: 10px 5px;
		font-size: 14px;
	}
}
.fc-theme-standard {
	td {
		border: 1px solid rgba(var(--v-border-color), 1) !important;
	}
	th {
		border: 1px solid rgba(var(--v-border-color), 1) !important;
		border-bottom: 0 !important;
	}
	.fc-scrollgrid {
		border: 0 !important;
	}
}
.fc-h-event {
	background-color: rgb(var(--v-theme-primary));
	border: 1px solid rgb(var(--v-theme-primary));
	display: block;
}
.fc-direction-ltr {
	.fc-button-group {
		>.fc-button {
			&:not(:last-child) {
				border-bottom-left-radius:$border-radius-root;
				border-top-left-radius: $border-radius-root;
			}
			&:not(:first-child) {
				border-bottom-right-radius: $border-radius-root;
				border-top-right-radius: $border-radius-root;
				margin-left: -1px;
			}
		}
	}
}
.fc-button-group {
	.fc-dayGridMonth-button {
		border-bottom-right-radius: 0px !important;
		border-top-right-radius: 0px !important;
	}
	.fc-timeGridDay-button {
		border-bottom-left-radius: 0px !important;
		border-top-left-radius: 0px !important;
	}
    .fc-timeGridWeek-button{
        border-radius: 0 !important;
    }
}
.fc-today-button {
	border-radius: $border-radius-root !important;
}

@media screen and (max-width:600px) {
	.fc {
		.fc-toolbar {
			display: block;
			text-align: center;
		}
	}
	.fc-toolbar-chunk {
		.fc-toolbar-title {
			margin: 15px 0;
		}
	}
}`
}

function generateAuthentication(): string {
    return expandToString`
.authentication{
    &::before{
        content: "";
        position: absolute;
        height: 100%;
        width: 100%;
        opacity: 0.3;
        left: 0;
        top: 0;
        bottom: 0;
        background: radial-gradient(rgb(210, 241, 223), rgb(211, 215, 250), rgb(186, 216, 244)) 0% 0% / 400% 400%;
    }
    .auth-header{
        position: absolute;
        top: 0;
        left: 0;    
    }   
    @media screen and (max-width:1280px){
        .auth-header{
            position: unset;
        } 
    }
}
.verification{
    .v-field__input{
        text-align: center;
    }
} 
.auth-divider{
    span{
        z-index: 1;
    }
    &::before{
        position: absolute;
        width: 100%;
        border-top: thin solid rgb(229, 234, 239);
        top: 50%;
        content: "";
        transform: translateY(50%);
        left: 0;
    }
    &::after
    {
        position: absolute;
        width: 100%;
        border-top: thin solid rgb(229, 234, 239);
        top: 50%;
        content: "";
        transform: translateY(50%);
        right: 0;
    }
}

@media (min-width: 1536px){
    .auth{
        .v-col-lg-7{
            flex: 0 0 66.66%;
            max-width: 66.66%;
        }
        .v-col-lg-5{
            flex: 0 0 33.33%;
            max-width: 33.33%;
        }
    }
   
}
@media screen and (max-width:1280px){
    .mh-100{
        height: 100% !important;
    } 
}

@media screen and (max-width:600px){
    .mw-100{
        width: 100%;
        padding: 0 15px;
    } 
}`
}

function generateDashboard(): string {
    return expandToString`
.month-table {
    &.custom-px-0 {
        thead {
            tr {
                th:first-child {
                    padding-left: 0 !important;
                }
                th:last-child {
                    padding-right: 0 !important;
                }
            }
        }
        tr.month-item {
            td:first-child {
                padding-left: 0 !important;
            }
            td:last-child {
                padding-right: 0 !important;
            }
        }
    }
    tr.month-item {
        td {
            padding-top: 16px !important;
            padding-bottom: 16px !important;
        }
        &:hover {
            background: transparent !important;
        }
    }
}

.recent-transaction {
    .line {
        width: 2px;
        height: 35px;
    }
}


.chip-label {
    width: 80px;
    justify-content: center;
}`
}

function generateDatatable(): string {
    return expandToString`
.customize-table {
  border-radius: $border-radius-root;
  .vue3-easy-data-table__main,
  .vue3-easy-data-table__footer {
    border-radius: $border-radius-root;
  }
  white-space: nowrap;
  --easy-table-border: 1px solid rgb(var(--v-theme-inputBorder), 0.1);
  --easy-table-row-border: 1px solid rgb(var(--v-theme-inputBorder), 0.1);

  --easy-table-header-font-size: 14px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: rgb(var(--v-theme-textPrimary));
  --easy-table-header-background-color: rgb(var(--v-theme-surface));

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: rgb(var(--v-theme-surface));
  --easy-table-body-even-row-background-color: rgba(0, 0, 0, 0.02);

  --easy-table-body-row-font-color: rgb(var(--v-theme-textPrimary));
  --easy-table-body-row-background-color: rgb(var(--v-theme-surface));
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 14px;

  --easy-table-body-row-hover-font-color: rgb(var(--v-theme-textPrimary));
  --easy-table-body-row-hover-background-color: rgba(0, 0, 0, 0.02);

  --easy-table-body-item-padding: 15px;

  --easy-table-footer-background-color: rgb(var(--v-theme-surface));
  --easy-table-footer-font-color: rgb(var(--v-theme-textPrimary));
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;

  --easy-table-scrollbar-track-color: #;
  --easy-table-scrollbar-color: #;
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  --easy-table-scrollbar-corner-color: #;

  --easy-table-loading-mask-background-color: #;
}`
}

function generateEditor(): string {
    return expandToString`
.ProseMirror {
    padding: 20px;
    border: 1px solid rgb(var(--v-theme-inputBorder), 0.3);
    border-radius: 0 0 12px 12px;
    &.ProseMirror-focused {
        outline-color: rgb(var(--v-theme-primary), 0.3) !important;
    }
    > * + * {
        margin-top: 0.75em;
    }

    ul,
    ol {
        padding: 0 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.1;
    }

    code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }

    pre {
        background: #0d0d0d;
        color: #fff;
        font-family: 'JetBrainsMono', monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;

        code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: 0.8rem;
        }
    }

    img {
        max-width: 100%;
        height: auto;
    }

    blockquote {
        padding-left: 1rem;
        border-left: 2px solid rgba(#0d0d0d, 0.1);
    }

    hr {
        border: none;
        border-top: 2px solid rgba(#0d0d0d, 0.1);
        margin: 2rem 0;
    }
}`
}