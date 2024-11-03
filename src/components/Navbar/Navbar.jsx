import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
} from '@chakra-ui/react'

const Navbar = () => {
  return (
    <>
      <Box bg="purple.100" px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box color="white">Durham</Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default Navbar;