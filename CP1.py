from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

driver.get("http://localhost:5173")

driver.maximize_window()

time.sleep(2)

element_mascota = driver.find_element(By.ID, "mascota")
element_mascota.send_keys("Mila")

time.sleep(2)

element_propietario = driver.find_element(By.ID, "propietario")
element_propietario.send_keys("Pedro")

time.sleep(2)

element_email = driver.find_element(By.ID, "email")
element_email.send_keys("pedro@gmail.com")

time.sleep(2)

element_fecha = driver.find_element(By.ID, "alta")
element_fecha.send_keys("30/04/2025")

time.sleep(2)

element_sintomas = driver.find_element(By.ID, "sintomas")
element_sintomas.send_keys("Molestias pata derecha trasera")

time.sleep(2)

btn_agregar = driver.find_element(By.ID, "agregar")
btn_agregar.click()

time.sleep(5)

btn_editar = driver.find_element(By.ID, "editar")
btn_editar.click()

time.sleep(2)

element_propietario = driver.find_element(By.ID, "propietario")
element_propietario.clear()
time.sleep(2)
element_propietario.send_keys("Andres")

time.sleep(2)

element_email = driver.find_element(By.ID, "email")
element_email.clear()
time.sleep(2)
element_email.send_keys("andres@gmail.com")

time.sleep(2)

btn_agregar = driver.find_element(By.ID, "agregar")
btn_agregar.click()

time.sleep(5)

btn_eliminar = driver.find_element(By.ID, "eliminar")
btn_eliminar.click()

time.sleep(2)

alert = driver.switch_to.alert
alert.accept()

time.sleep(10)



















time.sleep(10)

