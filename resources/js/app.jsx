import React from 'react'
import {createRoot} from 'react-dom/client'
import {createInertiaApp } from '@inertiajs/inertia-react'
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers'

// CSS
import "react-perfect-scrollbar/dist/css/styles.css";
import "../css/tailwind.css";

// i18n (needs to be bundled)
import "./i18n";

// App Container
import DefaultLayout from './components/Layouts/DefaultLayout';

// redux
import { Provider } from "react-redux";
import store from "./store/index";

createInertiaApp({
    // Below you can see that we are going to get all React components from resources/js/Pages folder
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`,import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        createRoot(el).render(
            <Provider store={store}>
              <DefaultLayout>
                  <App {...props} />
              </DefaultLayout>
            </Provider>)
    },
})
