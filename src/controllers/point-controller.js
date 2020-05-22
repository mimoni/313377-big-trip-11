import {render, replace, RenderPosition} from '../utils/render';
import MainWaypointItemComponent from '../components/main-content-waypoint';
import MainEditFormComponent from '../components/main-content-edit-form';

const StatusCodesEsc = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

export default class PointController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._waypointItemComponent = null;
    this._editFormComponent = null;
  }

  render(card) {
    const oldTaskComponent = this._waypointItemComponent;
    const oldTaskEditComponent = this._editFormComponent;

    this._waypointItemComponent = new MainWaypointItemComponent(card);
    this._editFormComponent = new MainEditFormComponent(card);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === StatusCodesEsc.ESCAPE || evt.key === StatusCodesEsc.ESC;

      if (isEscKey) {
        this._replaceFormCardToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._waypointItemComponent.setBtnClickHandler(() => {
      this._replaceCardToFormCard();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._editFormComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceFormCardToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._editFormComponent.setFavoritesBtnClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {isFavorite: !card.isFavorite}));
    });

    if (oldTaskEditComponent && oldTaskComponent) {
      replace(this._waypointItemComponent, oldTaskComponent);
      replace(this._editFormComponent, oldTaskEditComponent);
    } else {
      render(this._container, this._waypointItemComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    this._replaceFormCardToCard();
  }

  _replaceCardToFormCard() {
    this._onViewChange();
    replace(this._editFormComponent, this._waypointItemComponent);
  }

  _replaceFormCardToCard() {
    replace(this._waypointItemComponent, this._editFormComponent);
  }
}
