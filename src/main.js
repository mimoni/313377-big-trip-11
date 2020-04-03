import {createRouteTemplate} from './components/route-header';
import {createCostTemplate} from './components/cost-header';
import {createMenuTemplate} from './components/menu';
import {createFilterTemplate} from './components/filter';
import {createSortTemplate} from './components/sort';
import {createEditEventTemplate} from './components/edit-event';
import {createDayTemplate} from './components/day';
import {createRoutePointTemplate} from './components/route-point';

const POINT_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);

const tripMainElement = siteHeaderElement.querySelector(`.trip-main`);
render(tripMainElement, createRouteTemplate(), `afterbegin`);

const tripInfoElement = siteHeaderElement.querySelector(`.trip-info`);
render(tripInfoElement, createCostTemplate());

const tripControlsElement = siteHeaderElement.querySelector(`.trip-controls`);
render(tripControlsElement.children[0], createMenuTemplate(), `afterend`);
render(tripControlsElement, createFilterTemplate());

const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
render(tripEventsElement, createSortTemplate());
render(tripEventsElement, createEditEventTemplate());
render(tripEventsElement, createDayTemplate());

const routerPointContainerElement = siteMainElement.querySelector(`.trip-events__list`);
for (let i = 0; i < POINT_COUNT; i++) {
  render(routerPointContainerElement, createRoutePointTemplate());
}
