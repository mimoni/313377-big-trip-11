import InfoContainerComponent from './components/header-containerInfo.js';
import HeaderInfoTripComponent from './components/header-trip-info.js';
import HeaderCostTripComponent from './components/header-trip-cost.js';
import HeaderSiteMenuComponent from './components/header-trip-menu.js';
import HeaderFilterComponent from './components/header-trip-filter.js';

import MainTripDaysListComponent from './components/maintContent-listDay.js';
import MainSortTripComponent from './components/maintContent-filter-sort.js';
import MainNumberDayComponent from './components/maintContent-day.js';
import MainListWaypointComponent from './components/maintContent-listWaypoint.js';
import MainEditFormComponent from './components/maintContent-edit-form.js';
import MainWaypointItemComponent from './components/maintContent-waypoint.js';

import {render, RenderPosition, getRandomIntegerNumber} from './utils.js';
import {generateFilters} from './mock/filter.js';
import {generateCards} from './mock/events.js';

const TRIP_COUNT = 15;
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

  const renderTripCard = (cardListElement, countCard) => {
    const onEditButtonClick = () => {
      cardListElement.replaceChild(editFormComponent.getElement(), waypointItemComponent.getElement());
    };

    const onEditFormSubmit = (evt) => {
      evt.preventDefault();
      cardListElement.replaceChild(waypointItemComponent.getElement(), editFormComponent.getElement());
    };

    const waypointItemComponent = new MainWaypointItemComponent(countCard);
    const editEventBtn = waypointItemComponent.getElement().querySelector(`.event__rollup-btn`);
    editEventBtn.addEventListener(`click`, onEditButtonClick);

    const editFormComponent = new MainEditFormComponent(countCard);
    const editEventForm = editFormComponent.getElement().querySelector(`form`);
    editEventForm.addEventListener(`submit`, onEditFormSubmit);

    render(cardListElement, waypointItemComponent.getElement(), RenderPosition.BEFOREEND);
  };

  const renderTripDays = (daysListElement, cardsTrip) => {
    const mainTripDaysListElement = daysListElement.getElement();

    cardsTrip.map((card, index) => {
      const tripList = getRandomIntegerNumber(1, 5);

      const numberDay = new MainNumberDayComponent(card, index);
      const mainListWaypoint = new MainListWaypointComponent();

      render(mainTripDaysListElement, numberDay.getElement(), RenderPosition.BEFOREEND);

      render(numberDay.getElement(), mainListWaypoint.getElement(), RenderPosition.BEFOREEND);

      const mainListWaypointElement = mainListWaypoint.getElement();
      cardsTrip.slice(0, tripList).forEach((countCard) => {
        renderTripCard(mainListWaypointElement, countCard);
      });
    });
  };

  const tripDaysListComponent = new MainTripDaysListComponent();
  render(mainTripEventsElement, new MainSortTripComponent().getElement(), RenderPosition.AFTERBEGIN);
  render(mainTripEventsElement, tripDaysListComponent.getElement(), RenderPosition.BEFOREEND);
  renderTripDays(tripDaysListComponent, cards);
};

getBasicBlock();
getHeaderSite();
getMainContentSite();
