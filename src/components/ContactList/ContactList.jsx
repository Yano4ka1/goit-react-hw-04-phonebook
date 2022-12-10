import PropTypes from 'prop-types';
import style from './ContactList.module.css';

export const ContactList = ({ contact, onDeleteContact }) => {
    return <div>
        <ul>
          {contact.map((item, index) => {
            return (<li className={style.list} key={index}>
              <p>{item.name}: {item.number}</p>
              <button type="button"  onClick={() => onDeleteContact(item.id)}>Delete</button>
            </li>)
          })}
        </ul>
      </div>
}

ContactList.propTypes = {
  contact: PropTypes.arrayOf(PropTypes.shape(
    {
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }
  )).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
}