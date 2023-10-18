import { React, useState} from 'react'
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery  } from '@mui/material';
import { useGetProductsQuery } from 'state/api';
import Header from "components/Header";

//Creating a component before hand for simplicity.
const Product = ({
  //All these values will come from database.
  _id,
  name,
  description,
  price,
  rating,
  supply,
  category,
  stat
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false); //Card expanded or not.

  return ( //Using card component to display the products.
    <Card 
      sx ={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem"
      }}
    >
      <CardContent>
        <Typography sx={{fontSize: 14}} color={theme.palette.secondary[700]} gutterBottom>
          {category}
        </Typography>
        <Typography variant='h5' component="div">
          {name}
        </Typography>
        <Typography sx={{mb: '1.5rem'}} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button 
        variant='primary'
        size="small"
        onClick = { ()=> setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
       in={isExpanded}
       timeout = "auto"
       unmountOnExit
       sx={{
        color: theme.palette.neutral[300]
       }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>Yearly Sales This Year: {stat.yearlySalesTotal}</Typography>
          <Typography>Yearly Total Sold Units: {stat.yealyTotalSoldUnits}</Typography>
        </CardContent>

      </Collapse>
    </Card>
  )
}

const Products = () => {
  const {data, isLoading} = useGetProductsQuery();
  const isNonMobile = true;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Products" subtitle="See your list of products" />
      {data || !isLoading ? (
        <Box 
          mt="20px" 
          display="grid" 
          gridTemplateColumns="repeat(4, minmax(0,1fr))" 
          justifyContent="space-between" rowGap="20px" columnGap="1.33%" 
          sx={{
          "& > div" : {gridColumn: isNonMobile ? undefined : "span 4"}
        }}>
        {data.map(
          ({ //Passing each value for each product.
          _id,
          name,
          description,
          price,
          rating,
          category,
          supply,
          stat
        }) => ( //Using the product component we made earlier.
          <Product 
           key = {_id}
           _id = {_id}
           name = {name}
           description = {description}
           price = {price}
           rating = {rating}
           category = {category}
           supply = {supply}
           stat = {stat}
          />
        ))}
        </Box>// As data might take time to load, we will show a loading screen till it loads.
      ) : <>Loading...</>}
    </Box>
  )
}

export default Products