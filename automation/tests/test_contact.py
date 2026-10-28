from playwright.sync_api import Page, expect

EMAIL = "rafaelespinosa0915@gmail.com"


def test_contact_links_point_to_real_profiles(site: Page):
    contact = site.locator("#contact")

    expect(contact.get_by_role("link", name=EMAIL)).to_have_attribute("href", f"mailto:{EMAIL}")
    expect(contact.get_by_role("link", name="GitHub")).to_have_attribute(
        "href", "https://github.com/heyyyyRaf"
    )
    expect(contact.get_by_role("link", name="LinkedIn")).to_have_attribute(
        "href", "https://www.linkedin.com/in/espinosa-rafael-carbajal-5343043ab/"
    )


def test_no_resume_download_until_a_file_is_configured(site: Page):
    # Negative: with no resume file set, there must be no download link that leads nowhere.
    expect(site.get_by_role("link", name="Download resume")).to_have_count(0)
    expect(site.get_by_role("link", name="Request my resume").first).to_have_attribute(
        "href", f"mailto:{EMAIL}?subject=Resume%20request"
    )
