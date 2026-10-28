from playwright.sync_api import Page, expect


def filter_button(page: Page, label: str):
    # exact=True: "Mobile" must not also match "View details about Mobile Application Testing".
    return page.locator("#projects").get_by_role("button", name=label, exact=True)


def test_filter_shows_only_matching_projects(site: Page):
    filter_button(site, "Automation").click()

    expect(filter_button(site, "Automation")).to_have_attribute("aria-pressed", "true")
    cards = site.locator("#projects").get_by_role("article")
    expect(cards).to_have_count(1)
    expect(cards.first).to_contain_text("Python + Playwright")


def test_all_filter_restores_every_project(site: Page):
    filter_button(site, "Mobile").click()
    expect(site.locator("#projects").get_by_role("article")).to_have_count(1)

    filter_button(site, "All").click()
    expect(site.locator("#projects").get_by_role("article")).to_have_count(5)


def test_project_details_open_and_close_with_escape(site: Page):
    site.locator("#projects").get_by_role("button", name="View details").first.click()

    dialog = site.get_by_role("dialog")
    expect(dialog).to_be_visible()
    expect(dialog.get_by_role("heading", level=2)).to_be_visible()

    # Negative path: Escape must close the dialog, not leave it stuck open.
    site.keyboard.press("Escape")
    expect(dialog).to_be_hidden()
