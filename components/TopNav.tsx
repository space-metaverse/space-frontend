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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "../redux/hooks";

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

  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items);

  const settings = [
    ...(!username ? ["Login"] : []),
    ...(username ? ["Profile"] : []),
    ...(username ? ["Logout"] : []),
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
      path = "/profile";
    }
    if (page === "Login") {
      path = "/login";
    }
    if (page === "Logout") {
      path = "/login";
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("immerToken");
      window.localStorage.removeItem("hubsToken");
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
            <Stack direction="row" spacing={2}>
              <IconButton
                aria-label="cart"
                onClick={() => router.push("/checkout")}
              >
                <StyledBadge
                  badgeContent={String(cartItems.length ?? 0)}
                  color="secondary"
                >
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={username} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            </Stack>
            <Menu
              sx={{ mt: "45px" }}
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleNavigate(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
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
