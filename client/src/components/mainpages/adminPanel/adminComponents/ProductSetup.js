import React from 'react';
import ProductList from './ProductList';
import CreateProduct from './CreateProduct';
import CreateCategories from './CreateCategories';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/accordion';
import ToppingExtra from './ToppingExtra';
import ToppingRemove from './ToppingRemove';
import AddAdditive from './AddAdditive';

const ProductSetup = () => {
  const settingsstate = useSelector((state) => state.systemSettingsReducer);
  const { settings } = settingsstate;

  const border = settings[0]?.color[0]?.borderColor;

  return (
    <div className='grid grid-cols-12 gap-4'>
      <div className='xl:col-span-4 col-span-12'>
        <Accordion allowToggle>
          <AccordionItem>
            <div className={`py-3 px-4 bg-gray-600 text-xl border-b ${border}`}>
              <AccordionButton>
                <div>Kategorie hinzufügen</div>
              </AccordionButton>
            </div>
            <AccordionPanel>{<CreateCategories />}</AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <div className={`py-3 px-4 bg-gray-600 text-xl border-b ${border}`}>
              <AccordionButton>
                <div>Extras hinzufügen</div>
              </AccordionButton>
            </div>
            <AccordionPanel>{<ToppingExtra />}</AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <div className={`py-3 px-4 bg-gray-600 text-xl border-b ${border}`}>
              <AccordionButton>
                <div>Abwahl hinzufügen</div>
              </AccordionButton>
            </div>
            <AccordionPanel>{<ToppingRemove />}</AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <div className={`py-3 px-4 bg-gray-600 text-xl border-b ${border}`}>
              <AccordionButton>
                <div>Zusatzstoffe hinzufügen</div>
              </AccordionButton>
            </div>
            <AccordionPanel>{<AddAdditive />}</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <div className='xl:col-span-5 col-span-12'>{<ProductList />}</div>
      <div className='xl:col-span-3 col-span-12'>{<CreateProduct />}</div>
    </div>
  );
};

export default ProductSetup;
