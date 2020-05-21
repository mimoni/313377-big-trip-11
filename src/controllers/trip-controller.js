import {render, RenderPosition} from '../utils/render';
import {getRandomIntegerNumber} from '../utils/common';
import MainNumberDayComponent from '../components/maint-content-day';
import MainListWaypointComponent from '../components/maint-content-list-waypoint';
import PointController from './point-controller';

const MAX_VALUE_IN_TRIP_LIST = 5;

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
      const pointController = new PointController(mainListWaypointElement);
      cards.slice(0, tripList).forEach((card) => {
        pointController.render(card);
      });
    });
  }
}
