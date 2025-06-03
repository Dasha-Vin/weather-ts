import type { FC } from 'react';
import type { FormProps } from './types';

const Form: FC<FormProps> = ({ weatherMethod }) => {
  return (
    <form onSubmit={weatherMethod}>
      <input type="text" name="city" placeholder="Город" />
      <button type="submit">Получить погоду</button>
    </form>
  );
};

export default Form;