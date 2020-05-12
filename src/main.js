import InfoContainerComponent from './components/header-container-info.js';
import HeaderInfoTripComponent from './components/header-trip-info.js';
import HeaderCostTripComponent from './components/header-trip-cost.js';
import HeaderSiteMenuComponent from './components/header-trip-menu.js';
import HeaderFilterComponent from './components/header-trip-filter.js';

import MainNoPointsComponent from './components/maint-content-no-points.js';
import MainTripDaysListComponent from './components/maint-content-list-day.js';
import MainSortTripComponent from './components/maint-content-filter-sort.js';

import TripController from './controllers/TripController.js';

import {render, RenderPosition} from './utils/render.js';
import {generateFilters} from './mock/filter.js';
import {generateCards} from './mock/events.js';

const TRIP_COUNT = 15;

const headerElement = document.querySelector(`.page-header`);
const headerTripMainElement = headerElement.querySelector(`.trip-main`);
const headerTripControlsElement = headerElement.querySelector(`.trip-controls`);
const mainTripEventsElement = document.querySelector(`.trip-events`);

const getBasicBlock = () => {
  render(headerTripMainElement, new InfoContainerComponent(), RenderPosition.AFTERBEGIN);
};

const getHeaderSite = () => {
  const headerTripInfoElement = headerElement.querySelector(`.trip-info`);
  const filters = generateFilters();

  render(headerTripInfoElement, new HeaderInfoTripComponent(), RenderPosition.BEFOREEND);
  render(headerTripInfoElement, new HeaderCostTripComponent(), RenderPosition.BEFOREEND);
  render(headerTripControlsElement, new HeaderSiteMenuComponent(), RenderPosition.AFTERBEGIN);
  render(headerTripControlsElement, new HeaderFilterComponent(filters), RenderPosition.BEFOREEND);
};

const getMainContentSite = () => {
  const cards = generateCards(TRIP_COUNT);

  const tripDaysListComponent = new MainTripDaysListComponent();
  render(mainTripEventsElement, new MainSortTripComponent(), RenderPosition.AFTERBEGIN);

  const tripController = new TripController(tripDaysListComponent);

  if (!cards.length) {
    render(mainTripEventsElement, new MainNoPointsComponent(), RenderPosition.BEFOREEND);
  } else {
    render(mainTripEventsElement, tripDaysListComponent, RenderPosition.BEFOREEND);
    tripController.render(cards);
  }
};

getBasicBlock();
getHeaderSite();
getMainContentSite();
