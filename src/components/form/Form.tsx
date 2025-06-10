import { useForm, Controller } from "react-hook-form";
import type { FormProps } from './types';
import type {FC} from "react"
import type { IFormInputs } from './types';

export const Form: FC<FormProps> = ({ onFormSubmit }) => {
  const { 
    handleSubmit, control, formState: { errors } 
  } = useForm<IFormInputs>({
    defaultValues: {
      city: ""
    }
  });

  const onSubmit = (data: IFormInputs) => {
    onFormSubmit({ city: data.city });
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="city"
            control={control}
            rules={{ required: "Поле 'Город' обязательно для заполнения" }}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  type="text"
                  placeholder="Город"
                />
                <div>
                {errors.city && <span className="error" style={{ color: 'red', fontSize: '14px' }}>{errors.city.message}</span>}
                </div>
              </div>
            )}
          />
        </div>
        
        <div>
          <button style={{marginLeft: "30px"}} type="submit">
            Получить погоду
          </button>
        </div>
      </form>
  );
};