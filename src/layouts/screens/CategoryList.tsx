// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, Image } from 'react-native';
// // import { fetchData } from './api';
// import axios from 'axios';

// const CategoryList = () => {

//   const [productData, setProductData] = useState(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://ykpt.braincave.work/api/v2/products/2');
//         setProductData(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);


//   return (
//     <View>
//       <Text>Category List</Text>
//       <ScrollView>
//         <View>
        
//           <View>
//             {productData && (
//               <View>
//                 <Text>{productData.data.id}</Text>
//                 <Text>{productData.data.name}</Text>
//                 <Image
//                   source={{ uri: productData.data.thumbnail_img }}
//                   style={{ width: 200, height: 200 }}
//                 />
//                 <Text>{productData.data.user_id}</Text>

//               </View>
//             )}
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default CategoryList;


import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import axios from 'axios';

const CategoryList = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get('http://ykpt.braincave.work/api/v2/products');
        setProductData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Category List</Text>
      <ScrollView>
        <View>
          {productData && productData.map(product => (
            <View key={product.id}>
              <Text>{product.id}</Text>
              <Text>{product.name}</Text>
              <Image
                source={{ uri: product.thumbnail_img }}
                style={{ width: 100, height: 100 }}
              />
              <Text>{product.user_id}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryList;
