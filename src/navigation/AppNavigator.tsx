// src/navigation/AppNavigator.tsx (Fragmento de las rutas principales)

// Importar todas las pantallas
import DashboardScreen from '../screens/DashboardScreen';
import VentasScreen from '../screens/VentasScreen'; 
import ClientesScreen from '../screens/ClientesScreen';
import ArticulosScreen from '../screens/ArticulosScreen';
import CobrosScreen from '../screens/CobrosScreen';
import GastosScreen from '../screens/GastosScreen';
// ... SincronizacionScreen, AlmacenScreen, etc.

// ... dentro de Stack.Navigator:
{isAuthenticated ? (
  // Flujo Principal (Acceso al vendedor)
  <>
    {/* La pantalla principal del vendedor, no mostrar el header de la stack */}
    <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} /> 
    <Stack.Screen name="VentasScreen" component={VentasScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ClientesScreen" component={ClientesScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ArticulosScreen" component={ArticulosScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CobrosScreen" component={CobrosScreen} options={{ headerShown: false }} />
    <Stack.Screen name="GastosScreen" component={GastosScreen} options={{ headerShown: false }} />
    {/* ... Añadir el resto de pantallas */}
  </>
) : (
  <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
)}
// ...