import React, { Component, ReactNode } from 'react';
import { Data } from '~/models';

import Consumption, { Props as ConsumptionProps } from './Consumption';

import './style.css';

import imgCoffee from './img/coffee.png';
import imgMilk from './img/milk.png';
import imgChocolate from './img/chocolate.png';
import imgWater from './img/water.png';
import imgSyrup from './img/syrup.png';
import { calcPeriod } from '~/services/calc-period';

interface Props {
  data: Data;
}

interface IConsumptions {
  water: number,
  milk: number,
  chocolate: number,
  coffee: number,
  syrup: number,
}

class Consumptions extends Component<Props> {
  render(): ReactNode {
    const { data } = this.props;
    const consump = this.calcConsumptions();
    const period = calcPeriod(data.dispensings)

    const content: ConsumptionProps[] = [
      {
        imgPath: imgWater,
        amount: consump.water,
        description: <>
          liters of water were consumed within the last <span>{period}</span> days
        </>,
      },
      {
        imgPath: imgMilk,
        amount: consump.milk,
        description: <>
          liters of milk were consumed within the last <span>{period}</span> days
        </>,
      },
      {
        imgPath: imgChocolate,
        amount: consump.chocolate,
        description: <>
          kg of powder were consumed within the last <span>{period}</span> days
        </>,
      },
      {
        imgPath: imgCoffee,
        amount: consump.coffee,
        description: <>
          kg of beans were consumed within the last <span>{period}</span> days
        </>,
      },
      {
        imgPath: imgSyrup,
        amount: consump.syrup,
        description: <>
          liters of syrup were consumed within the last <span>{period}</span> days
        </>,
      },
    ];

    return (
      <div className="info-block consumptions">
        <header>Consumptions</header>
        <div className="inner">
          {content.map((consumption, i) => (
            <Consumption
              key={i}
              imgPath={consumption.imgPath}
              amount={consumption.amount}
              description={consumption.description}
            />
          ))}
        </div>
      </div>
    );
  }

  private calcConsumptions(): IConsumptions {
    const { dispensings, recipes } = this.props.data;

    const consumptions: IConsumptions = {
      water: 0,
      milk: 0,
      chocolate: 0,
      coffee: 0,
      syrup: 0,
    }

    for (const disp of dispensings) {
      const { recipeId } = disp;
      const recipe = recipes.find(r => r.id === recipeId);
      const ingredients = Object.keys(consumptions);
      if (!recipe) continue;
      ingredients.forEach(ing => {
        // @ts-ignore
        if (recipe[ing]) consumptions[ing] += recipe[ing];
      });
    }

    return consumptions;
  }
}

export default Consumptions;
