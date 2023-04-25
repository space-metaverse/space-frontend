import { useState, MouseEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logoImage from "../public/logo.png";
import Link from "next/link";
import {
  Badge,
  Stack,
  BadgeProps,
  styled,
  MenuItem,
  Tooltip,
  Button,
  Avatar,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GridViewIcon from "@mui/icons-material/GridView";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { setCartItems } from "../redux/slices/cart";
import { useGetCartItemsQuery } from "../api/space";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const pages = ["Spaces", "Events", "Products", "About"];

const TopNav = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [username, setUsername] = useState<string>("");

  const dispatch = useAppDispatch();

  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items);

  const {
    data: cartData,
    error: cartError,
    isSuccess: cartSuccess,
    isLoading: cartLoading,
  } = useGetCartItemsQuery({});

  useEffect(() => {
    if (cartSuccess) {
      dispatch(setCartItems(cartData?.data || []));
    }
  }, [cartData?.data, cartSuccess, dispatch]);

  const settings = [
    ...(!username ? [{ title: "Sign In", icon: <AccountCircleIcon /> }] : []),
    ...(username ? [{ title: "Profile", icon: <AccountCircleIcon /> }] : []),
    ...(username ? [{ title: "My Spaces", icon: <GridViewIcon /> }] : []),
    ...(username ? [{ title: "Logout", icon: <LogoutIcon /> }] : []),
  ];

  const handleNavigate = (page: string) => {
    let path = "";
    if (page === "Spaces") {
      path = "/spaces";
    }
    if (page === "Events") {
      path = "/events";
    }
    if (page === "Products") {
      path = "/products";
    }
    if (page === "About") {
      path = "/about";
    }
    if (page === "Profile") {
      path =
        process.env.NEXT_PUBLIC_ENV === "prod"
          ? "https://account.tryspace.com"
          : "https://account.qa.tryspace.com";
    }
    if (page === "Sign In") {
      path = "/login";
    }
    if (page === "Logout") {
      path = "/login";
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("immerToken");
      window.localStorage.removeItem("hubsToken");
      window.localStorage.removeItem("accountId");
    }
    router.push(path);
    handleCloseNavMenu();
    handleCloseUserMenu();
  };

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const username = window.localStorage.getItem("username");
    if (username) {
      setUsername(username);
    }
  }, []);

  return (
    <AppBar position="static" sx={{ background: "white", color: "#111114" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" passHref style={{ marginRight: "1rem" }}>
            <Stack>
              <Image
                src={logoImage}
                alt="space-store"
                style={{ width: "60px", height: "100%", objectFit: "cover" }}
              />
            </Stack>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigate(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigate(page)}
                sx={{ my: 2, display: "block", color: "#111114" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
            >
              <IconButton
                aria-label="cart"
                onClick={() => router.push("/checkout")}
              >
                <StyledBadge
                  badgeContent={String(cartItems.length ?? 0)}
                  sx={{
                    mr: 3,
                    "& .MuiBadge-badge": {
                      backgroundColor: "#00ab00",
                      color: "white",
                      left: 20,
                      top: 18,
                    },
                  }}
                >
                  <ShoppingCartOutlinedIcon
                    sx={{ fontSize: "2rem", color: "black" }}
                  />
                </StyledBadge>
              </IconButton>
              {username && (
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt={username} src={"/avatar.png"} />
                </IconButton>
              )}
              {!username && (
                <Link href={"/login"}>
                  <Stack flexDirection="row">
                    <LoginOutlinedIcon
                      sx={{ fontSize: "2rem", color: "black", mr: 1 }}
                    />
                    <Typography variant="h6">SIGN IN</Typography>
                  </Stack>
                </Link>
              )}
              <Typography
                sx={{ display: { xs: "none", md: "block" } }}
                variant="h6"
              >
                {username}
              </Typography>
              <Tooltip title="Open settings" onClick={handleOpenUserMenu}>
                <IconButton aria-label="settings">
                  <MoreVertIcon
                    sx={{ color: "#3f3ff7", fontSize: 35, cursor: "pointer" }}
                  />
                </IconButton>
              </Tooltip>
            </Stack>
            <Menu
              sx={{ mt: "55px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(({ title, icon }) => (
                <MenuItem
                  key={title}
                  onClick={() => handleNavigate(title)}
                  sx={{
                    width: "20rem",
                    padding: "0rem 1rem",
                  }}
                >
                  {icon}
                  <Typography
                    textAlign="center"
                    variant="overline"
                    fontSize={20}
                    pl={3}
                  >
                    {title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopNav;
