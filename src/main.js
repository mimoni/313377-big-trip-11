import {createInfoContainerTemplate, createTripDaysList} from './components/basic-block.js';
import {createInfoTripTemplate} from './components/header-trip-info.js';
import {createCostTripTemplate} from './components/header-trip-cost.js';
import {createMenuTripTemplate} from './components/header-trip-menu.js';
import {createFilterTripTemplate} from './components/header-trip-filter.js';
import {createSortTripTemplate} from './components/maintContent-filter-sort.js';
import {createDayTemplate} from './components/maintContent-day.js';
import {createEditFormItemTemplate} from './components/maintContent-edit-form.js';
import {createWaypointItemTemplate} from './components/maintContent-waypoint.js';

import {getRandomIntegerNumber} from './utils.js';
import {generateFilters} from './mock/filter.js';
import {generateCards} from './mock/events.js';

const TRIP_COUNT = 15;
const headerElement = document.querySelector(`.page-header`);
const headerTripMainElement = headerElement.querySelector(`.trip-main`);
const headerTripControlsElement = headerElement.querySelector(`.trip-controls`);
const mainTripEventsElement = document.querySelector(`.trip-events`);

const renderTemplate = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const getBasicBlock = () => {
  renderTemplate(headerTripMainElement, createInfoContainerTemplate(), `afterbegin`);
  renderTemplate(mainTripEventsElement, createTripDaysList());
};

const getHeaderSite = () => {
  const filters = generateFilters();

  const headerTripInfoElement = headerElement.querySelector(`.trip-info`);
  renderTemplate(headerTripInfoElement, createInfoTripTemplate());
  renderTemplate(headerTripInfoElement, createCostTripTemplate());
  renderTemplate(headerTripControlsElement, createMenuTripTemplate(), `afterbegin`);
  renderTemplate(headerTripControlsElement, createFilterTripTemplate(filters));
};

const getMainContentSite = () => {
  const cards = generateCards(TRIP_COUNT);
  const mainTripDaysItemElement = document.querySelector(`.trip-days`);

  renderTemplate(mainTripEventsElement, createSortTripTemplate(), `afterbegin`);

  cards.map((card, index) => {
    const tripList = getRandomIntegerNumber(3, 5);
    renderTemplate(mainTripDaysItemElement, createDayTemplate(card, index));
    const mainTripEventsListElement = mainTripEventsElement.querySelector(`.trip-events__list--${index}`);

    if (index === 0) {
      renderTemplate(mainTripEventsListElement, createEditFormItemTemplate(card, index));
    }

    cards.slice(1, tripList)
      .forEach((count) => renderTemplate(mainTripEventsListElement, createWaypointItemTemplate(count)));
  });
};

getBasicBlock();
getHeaderSite();
getMainContentSite();
