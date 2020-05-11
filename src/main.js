import InfoContainerComponent from './components/header-container-info.js';
import HeaderInfoTripComponent from './components/header-trip-info.js';
import HeaderCostTripComponent from './components/header-trip-cost.js';
import HeaderSiteMenuComponent from './components/header-trip-menu.js';
import HeaderFilterComponent from './components/header-trip-filter.js';

import MainNoPointsComponent from './components/maint-content-no-points.js';
import MainTripDaysListComponent from './components/maint-content-listDay.js';
import MainSortTripComponent from './components/maint-content-filter-sort.js';
import MainNumberDayComponent from './components/maint-content-day.js';
import MainListWaypointComponent from './components/maint-content-listWaypoint.js';
import MainEditFormComponent from './components/maint-content-edit-form.js';
import MainWaypointItemComponent from './components/maint-content-waypoint.js';

import {render, RenderPosition, getRandomIntegerNumber} from './utils.js';
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
  render(headerTripMainElement, new InfoContainerComponent().getElement(), RenderPosition.AFTERBEGIN);
};

const getHeaderSite = () => {
  const headerTripInfoElement = headerElement.querySelector(`.trip-info`);
  const filters = generateFilters();

  render(headerTripInfoElement, new HeaderInfoTripComponent().getElement(), RenderPosition.BEFOREEND);
  render(headerTripInfoElement, new HeaderCostTripComponent().getElement(), RenderPosition.BEFOREEND);
  render(headerTripControlsElement, new HeaderSiteMenuComponent().getElement(), RenderPosition.AFTERBEGIN);
  render(headerTripControlsElement, new HeaderFilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
};

const getMainContentSite = () => {
  const cards = generateCards(TRIP_COUNT);

  const renderTripCard = (cardListElement, card) => {
    const replaceCardToFormCard = () => {
      cardListElement.replaceChild(editFormComponent.getElement(), waypointItemComponent.getElement());
    };

    const replaceFormCardToCard = () => {
      cardListElement.replaceChild(waypointItemComponent.getElement(), editFormComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === StatusCodesEsc.ESCAPE || evt.key === StatusCodesEsc.ESC;

      if (isEscKey) {
        replaceFormCardToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const waypointItemComponent = new MainWaypointItemComponent(card);
    const editEventBtn = waypointItemComponent.getElement().querySelector(`.event__rollup-btn`);
    editEventBtn.addEventListener(`click`, () => {
      replaceCardToFormCard();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const editFormComponent = new MainEditFormComponent(card);
    const editEventForm = editFormComponent.getElement().querySelector(`form`);
    editEventForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceFormCardToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(cardListElement, waypointItemComponent.getElement(), RenderPosition.BEFOREEND);
  };

  const renderTripDays = (daysListElement, cardsTrip) => {
    const mainTripDaysListElement = daysListElement.getElement();

    cardsTrip.map((_, index) => {
      const tripList = getRandomIntegerNumber(1, MAX_VALUE_IN_TRIP_LIST);

      const numberDay = new MainNumberDayComponent(index);
      const mainListWaypoint = new MainListWaypointComponent();

      render(mainTripDaysListElement, numberDay.getElement(), RenderPosition.BEFOREEND);

      render(numberDay.getElement(), mainListWaypoint.getElement(), RenderPosition.BEFOREEND);

      const mainListWaypointElement = mainListWaypoint.getElement();
      cardsTrip.slice(0, tripList).forEach((card) => {
        renderTripCard(mainListWaypointElement, card);
      });
    });
  };

  const tripDaysListComponent = new MainTripDaysListComponent();
  render(mainTripEventsElement, new MainSortTripComponent().getElement(), RenderPosition.AFTERBEGIN);

  if (!cards.length) {
    render(mainTripEventsElement, new MainNoPointsComponent().getElement(), RenderPosition.BEFOREEND);
  } else {
    render(mainTripEventsElement, tripDaysListComponent.getElement(), RenderPosition.BEFOREEND);
    renderTripDays(tripDaysListComponent, cards);
  }
};

getBasicBlock();
getHeaderSite();
getMainContentSite();
