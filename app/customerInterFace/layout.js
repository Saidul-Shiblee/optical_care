import { getLensTypes } from '@/lib/fetchData';
import { FormProvider } from '../context/FormContext';





export default async function Layout({ children }) {
    const lensType = await getLensTypes()
    return (
   
            <FormProvider lensType={lensType}>
           {children}
            </FormProvider>
 
    );
}