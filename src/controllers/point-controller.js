import {render, replace, RenderPosition} from '../utils/render';
import MainWaypointItemComponent from '../components/maint-content-waypoint';
import MainEditFormComponent from '../components/maint-content-edit-form';

const StatusCodesEsc = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

export default class PointController {
  constructor(container) {
    this._container = container;
  }

  render(card) {
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

    render(this._container, waypointItemComponent, RenderPosition.BEFOREEND);
  }
}
