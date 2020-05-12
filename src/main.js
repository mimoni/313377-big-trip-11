import InfoContainerComponent from './components/header-container-info.js';
import HeaderInfoTripComponent from './components/header-trip-info.js';
import HeaderCostTripComponent from './components/header-trip-cost.js';
import HeaderSiteMenuComponent from './components/header-trip-menu.js';
import HeaderFilterComponent from './components/header-trip-filter.js';

import MainNoPointsComponent from './components/maint-content-no-points.js';
import MainTripDaysListComponent from './components/maint-content-list-day.js';
import MainSortTripComponent from './components/maint-content-filter-sort.js';
import MainNumberDayComponent from './components/maint-content-day.js';
import MainListWaypointComponent from './components/maint-content-list-waypoint.js';
import MainEditFormComponent from './components/maint-content-edit-form.js';
import MainWaypointItemComponent from './components/maint-content-waypoint.js';

import {getRandomIntegerNumber} from './utils/common.js';
import {render, replace, RenderPosition} from './utils/render.js';
import {generateFilters} from './mock/filter.js';
import {generateCards} from './mock/events.js';

const TRIP_COUNT = 15;
const MAX_VALUE_IN_TRIP_LIST = 5;
const StatusCodesEsc = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

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

  const renderTripCard = (cardListElement, card) => {
    const replaceCardToFormCard = () => {
      replace(editFormComponent, waypointItemComponent);
    };

    const replaceFormCardToCard = () => {
      replace(waypointItemComponent, editFormComponent);
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === StatusCodesEsc.ESCAPE || evt.key === StatusCodesEsc.ESC;

      if (isEscKey) {
        replaceFormCardToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const waypointItemComponent = new MainWaypointItemComponent(card);
    waypointItemComponent.setBtnClickHandler(() => {
      replaceCardToFormCard();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const editFormComponent = new MainEditFormComponent(card);
    editFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      replaceFormCardToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(cardListElement, waypointItemComponent, RenderPosition.BEFOREEND);
  };

  const renderTripDays = (daysListElement, cardsTrip) => {
    const mainTripDaysListElement = daysListElement.getElement();

    cardsTrip.map((_, index) => {
      const tripList = getRandomIntegerNumber(1, MAX_VALUE_IN_TRIP_LIST);

      const numberDay = new MainNumberDayComponent(index);
      const mainListWaypoint = new MainListWaypointComponent();

      render(mainTripDaysListElement, numberDay, RenderPosition.BEFOREEND);

      render(numberDay.getElement(), mainListWaypoint, RenderPosition.BEFOREEND);

      const mainListWaypointElement = mainListWaypoint.getElement();
      cardsTrip.slice(0, tripList).forEach((card) => {
        renderTripCard(mainListWaypointElement, card);
      });
    });
  };

  const tripDaysListComponent = new MainTripDaysListComponent();
  render(mainTripEventsElement, new MainSortTripComponent(), RenderPosition.AFTERBEGIN);

  if (!cards.length) {
    render(mainTripEventsElement, new MainNoPointsComponent(), RenderPosition.BEFOREEND);
  } else {
    render(mainTripEventsElement, tripDaysListComponent, RenderPosition.BEFOREEND);
    renderTripDays(tripDaysListComponent, cards);
  }
};

getBasicBlock();
getHeaderSite();
getMainContentSite();
