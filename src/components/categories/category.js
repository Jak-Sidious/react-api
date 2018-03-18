import React from 'react';
import { Card, Image } from 'semantic-ui-react';
// edit and delete 

const CategoryCard = props => (
  <Card>
    <Image src='../static/img/images.png' />
    <Card.Content>
      <Card.Header>
        {"Category Name: /" +props.category_name}
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          {"Date Created: /" +props.date_created}
        </span>
      </Card.Meta>
      <Card.Description>
        {"Category Description: /" +props.category_description}
      </Card.Description>
    </Card.Content>
  </Card>
)

export default CategoryCard;
