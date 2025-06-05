import { useForm, Controller } from "react-hook-form";
import type { FormProps } from './types';

interface IFormInputs {
  city: string;
  remember: boolean;
}

const Form: React.FC<FormProps> = ({ weatherMethod }) => {
  const { 
    handleSubmit, control, formState: { errors } 
  } = useForm<IFormInputs>({
    defaultValues: {
      city: "",
      remember: false
    }
  });

  const onSubmit = (data: IFormInputs) => {
    weatherMethod({ city: data.city });
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
                {errors.city && <span style={{ color: 'red', fontSize: '14px' }}>{errors.city.message}</span>}
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

export default Form;