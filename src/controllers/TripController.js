import {render, RenderPosition, replace} from '../utils/render';
import MainWaypointItemComponent from '../components/maint-content-waypoint';
import MainEditFormComponent from '../components/maint-content-edit-form';
import {getRandomIntegerNumber} from '../utils/common';
import MainNumberDayComponent from '../components/maint-content-day';
import MainListWaypointComponent from '../components/maint-content-list-waypoint';

const MAX_VALUE_IN_TRIP_LIST = 5;
const StatusCodesEsc = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

export default class TripController {
  constructor(container) {
    this._container = container;
  }

  render(cards) {
    const mainTripDaysListElement = this._container.getElement();

    cards.map((_, index) => {
      const tripList = getRandomIntegerNumber(1, MAX_VALUE_IN_TRIP_LIST);

      const numberDay = new MainNumberDayComponent(index);
      const mainListWaypoint = new MainListWaypointComponent();

      render(mainTripDaysListElement, numberDay, RenderPosition.BEFOREEND);

      render(numberDay.getElement(), mainListWaypoint, RenderPosition.BEFOREEND);

      const mainListWaypointElement = mainListWaypoint.getElement();
      cards.slice(0, tripList).forEach((card) => {
        this._renderTripCard(mainListWaypointElement, card);
      });
    });
  }

  _renderTripCard(cardListElement, card) {
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
  }
}
