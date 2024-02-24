import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';

const ContactForm = ({ addContact }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;

    const newContact = {
      id: nanoid(),
      name: form.name.value,
      number: form.number.value,
    };
    const isAdded = addContact(newContact);

    if (isAdded) {
      form.reset();
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.inputs}>
        <label className={css.label} htmlFor="name">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          pattern="^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+(([' \-][a-zA-Zа-яА-ЯіІїЇєЄґҐ ])?[a-zA-Zа-яА-ЯіІїЇєЄґҐ]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label className={css.label} htmlFor="number">
          Number
        </label>
        <input
          type="tel"
          name="number"
          id="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
