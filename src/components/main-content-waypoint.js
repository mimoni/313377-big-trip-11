import {formatTime, getDuration, getRandomArrayItem} from '../utils/common.js';
import AbstractComponent from './abstract-component.js';

const createRepeatingOffersMarkup = (options) => {
  return options.map((option) => {
    const {name, price} = option;

    return (
      `<li class="event__offer">
        <span class="event__offer-title">${name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
       </li>`
    );
  }).join(`\n \n`);
};

const createWaypointItemTemplate = (card) => {
  const {city, typeOfWaypoints, startDate, endDate, offer, price} = card;

  const randomWaypointItem = getRandomArrayItem([...typeOfWaypoints.transfers, ...typeOfWaypoints.activities]);

  const isDateShowing = !!startDate;

  const time = isDateShowing ? formatTime(startDate) : ``;
  const nextTime = isDateShowing ? formatTime(endDate) : ``;

  const repeatingOffersMarkup = createRepeatingOffersMarkup(offer);

  const eventDuration = getDuration(startDate, endDate);

  return (
    `<li class="trip-events__item">
      <div class="event">

        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${randomWaypointItem.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${randomWaypointItem} to ${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="">${time}</time>
            &mdash;
            <time class="event__end-time" datetime="">${nextTime}</time>
          </p>
          <p class="event__duration">${eventDuration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>

        <ul class="event__selected-offers">
          ${repeatingOffersMarkup}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class WaypointItem extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createWaypointItemTemplate(this._card);
  }

  setBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
