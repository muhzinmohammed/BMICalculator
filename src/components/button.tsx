import React from 'react';
import { Pressable, Text, View } from 'react-native';

type Props = {
    style: any;
    name: any;
    nameStyle?: any;
    onPress?: () => void;
  };

export default function Button({onPress, style, nameStyle, name}: Props)  {
    return (
      <View style={style}>
        <Pressable onPress={onPress}>
            <Text style={nameStyle}>{name}</Text>
        </Pressable>
      </View>
    )
}
