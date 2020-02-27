import self as self
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.properties import ObjectProperty
from kivy.uix.label import Label
from kivy.factory import Factory
from kivy.uix.screenmanager import ScreenManager, Screen


class MainScreen(Screen):
    pass


class LinuxScreen(Screen):
    pass


class SqlScreen(Screen):
    pass


class HtmlScreen(Screen):
    pass


class ScreenApp(App):

    def build(self):
        sm = ScreenManager()
        scm = MainScreen(name="Welcome to EZManual!")
        ls = LinuxScreen(name="Linux")
        ss = SqlScreen(name="Sql")
        hs = HtmlScreen(name="Html")
        sm.add_widget(scm)
        sm.add_widget(ls)
        sm.add_widget(ss)
        sm.add_widget(hs)
        return sm


ScreenApp().run()
