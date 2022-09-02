import { useState } from "react";

const ListPage = (props) => {
  const [list, setList] = useState(props.list);

  const renderItem = ({ item }) => props.renderItem(item);

  return (
    <VStack padding={3.5}>
      <HStack
        borderBottomWidth={2}
        padding={1.5}
        alignItems="center"
        justifyContent="space-between"
      >
        <CustomText style={{ fontSize: 18 }}>Subject Posts:</CustomText>
        <Popover
          isOpen={isFilterOpen}
          placement="bottom left"
          trigger={(triggerProps) => (
            <Button
              size="xs"
              {...triggerProps}
              onPress={() => setIsFilterOpen(true)}
              bg={colors.blue}
              borderRadius="full"
              shadow={4}
            >
              <HStack alignItems="center" space={1}>
                <Icon
                  as={AntDesignIcon}
                  name="filter"
                  size={4}
                  color={colors.white}
                />
                <CustomText color={colors.white}>Filter</CustomText>
              </HStack>
            </Button>
          )}
        >
          <Popover.Content
            w="48"
            bgColor={colors.black}
            accessibilityLabel="Filter Posts"
          >
            <Popover.Arrow />
            <Popover.CloseButton onPress={() => setIsFilterOpen(false)} />
            <Popover.Header>Filter Posts</Popover.Header>
            <Popover.Body>Something</Popover.Body>
          </Popover.Content>
        </Popover>
      </HStack>
      <FlatList
        contentContainerStyle={{
          padding: "4%",
        }}
        data={subjects_data}
        renderItem={renderItem}
      />
    </VStack>
  );
};

export default ListPage;
