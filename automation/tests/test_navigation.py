import re

from playwright.sync_api import Page, expect


def test_nav_link_scrolls_to_its_section(site: Page):
    # Positive: clicking a menu link brings the matching section into view.
    site.get_by_role("navigation", name="Main").get_by_role("link", name="Contact").click()

    expect(site).to_have_url(re.compile(r"#contact$"))
    expect(site.get_by_role("heading", name="Let's talk")).to_be_in_viewport()


def test_mobile_menu_opens_and_closes(site: Page):
    site.set_viewport_size({"width": 390, "height": 844})
    menu_button = site.get_by_role("button", name="Open menu")
    expect(menu_button).to_have_attribute("aria-expanded", "false")

    menu_button.click()
    expect(site.get_by_role("button", name="Close menu")).to_have_attribute("aria-expanded", "true")

    # Choosing a link should also close the menu.
    site.get_by_role("navigation", name="Main").get_by_role("link", name="Projects").click()
    expect(site.get_by_role("button", name="Open menu")).to_have_attribute("aria-expanded", "false")
    expect(site.get_by_role("heading", name="Featured projects")).to_be_in_viewport()
