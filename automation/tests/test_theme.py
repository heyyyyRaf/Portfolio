from playwright.sync_api import Page, expect


def test_theme_toggle_switches_and_is_remembered(site: Page):
    html = site.locator("html")
    expect(html).not_to_have_attribute("data-theme", "light")

    site.get_by_role("button", name="Switch to light mode").click()
    expect(html).to_have_attribute("data-theme", "light")

    # The choice must survive a reload, not just the current visit.
    site.reload()
    expect(html).to_have_attribute("data-theme", "light")

    site.get_by_role("button", name="Switch to dark mode").click()
    expect(html).not_to_have_attribute("data-theme", "light")


def test_code_panels_stay_dark_in_light_mode(site: Page):
    # Negative: switching themes must not turn code into dark text on a dark editor.
    site.get_by_role("button", name="Switch to light mode").click()
    code = site.locator("#automation .code-pre").first
    expect(code).to_have_css("color", "rgb(195, 203, 230)")
