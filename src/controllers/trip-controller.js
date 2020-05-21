import {render, RenderPosition} from '../utils/render.js';
import {getRandomIntegerNumber} from '../utils/common.js';
import MainNumberDayComponent from '../components/maint-content-day.js';
import MainListWaypointComponent from '../components/maint-content-list-waypoint.js';
import PointController from './point-controller.js';

const MAX_VALUE_IN_TRIP_LIST = 5;

export default class TripController {
  constructor(container) {
    this._container = container;

    this._cards = [];
    this._showedCardControllers = [];
    this._pointController = null;

    this._onDataChangeBinded = this._onDataChange.bind(this);
    this._onViewChangeBinded = this._onViewChange.bind(this);
  }

  render(cards) {
    this._cards = cards;
    const mainTripDaysListElement = this._container.getElement();

    this._cards.map((_, index) => {
      const tripList = getRandomIntegerNumber(1, MAX_VALUE_IN_TRIP_LIST);

      const numberDay = new MainNumberDayComponent(index);
      const mainListWaypoint = new MainListWaypointComponent();

      render(mainTripDaysListElement, numberDay, RenderPosition.BEFOREEND);

      render(numberDay.getElement(), mainListWaypoint, RenderPosition.BEFOREEND);

      const mainListWaypointElement = mainListWaypoint.getElement();
      this._pointController = new PointController(mainListWaypointElement, this._onDataChangeBinded, this._onViewChangeBinded);
      this._cards.slice(0, tripList).forEach((card) => {
        this._pointController.render(card);
      });

      const newCards = this._renderTripCards(this._cards, mainListWaypointElement, this._onDataChange, this._onViewChange);
      this._showedCardControllers = this._showedCardControllers.concat(newCards);
    });
  }
  _renderTripCards(cardsSort, container, day, onDataChange, onViewChange) {
    return cardsSort.map((card) => {
      const pointController = new PointController(container, onDataChange, onViewChange);
      pointController.render(card);

      return pointController;
    });
  }

  _onDataChange(cardController, oldData, newData) {
    const index = this._cards.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._cards = [].concat(this._cards.slice(0, index), newData, this._cards.slice(index + 1));

    cardController.render(this._cards[index]);
  }

  _onViewChange() {
    this._showedCardControllers.forEach((it) => it.setDefaultView());
  }
}
